# Phase 9 — B5a Audit Finding N-2: the irreversible `down()`
## Post-implementation audit (DRAFT v0.1 — FOR REVIEW ONLY)

| Field | Value |
|---|---|
| **Status** | DRAFT. Not accepted. Decision ID **UNALLOCATED** — none is claimed by this document. Acceptance, if granted, would be recorded separately. |
| **Date drafted** | 26 Oct 2026 |
| **Subject** | Audit finding **N-2** only: `exports.down` in `04_Development/ui/server/migrations/1728200000000_b5a-authoritative-mvp.cjs` issuing DML against the BR-07 append-only table. |
| **Repository state at the time of the recorded runs** | As reported on 26 Oct 2026, when the evidence in §6 was captured: HEAD `09f0be8`, matching the local `origin/main` ref (no fetch performed), with three files modified and **uncommitted** — `01_Strategy/Decision Log.md`, `…/migrations/1728200000000_b5a-authoritative-mvp.cjs`, `…/server/test/fitness.static.test.ts`. **This records the state the evidence was produced against. It is not an assertion about the repository state at any later review or acceptance.** |

## 1. Scope and boundary

This document audits **one finding, N-2**, from implementation through disposition to verification.

**This is not an audit of B5a.** B5a as implemented under D-2026-046 is not assessed here, and no conclusion about it is offered or implied.

**Sibling findings are outside this boundary, and their status is unknown.** The identifier N-2 implies at least an N-1. The **B5a-wide** post-implementation audit remains unwritten — this document is scoped to N-2 alone and is not it — and the Repository Audit Decision Register contains no N-2 entry. That B5a-wide audit is referenced at two places in the repository, both Impact fields: D-2026-047, which records it as unrecorded with its Decision ID unallocated, and D-2026-049, which repeats that and additionally cites this document as an unaccepted draft. This document therefore **does not discharge whatever other findings that audit raised**, and accepting it must not be read as having done so.

Also outside scope: the legal-basis verification of fee figures (D5-P's remit, disposed of at D-2026-047), B5 completion, and the §18.2-excluded legal items.

## 2. Evidence classification

Every factual claim below carries a class. Conclusions state which classes they rest on.

- **[OBSERVED-C]** — executed by Claude, output read directly. Repository file contents, git state, and locally run `node` / `tsc` fall here.
- **[OBSERVED-A]** — executed by the owner on `ritz`; output captured to a log file that Claude then read raw. **This is not independent verification.** Claude did not initiate the command, did not witness execution, and cannot attest that the environment was unaltered between the command and the log. It is stronger than transcription and weaker than [OBSERVED-C]; it is not equivalent to [OBSERVED-C] and is not promoted to it anywhere in this document.
- **[OWNER-REPORTED]** — stated or pasted by the owner, with no independent artifact.
- **[INFERRED]** — reasoned from repository or third-party source code; not executed.

## 3. The finding

**Defect.** `exports.down` issued `DELETE FROM rules.rule_version` followed by `DELETE FROM rules.rule_set`. The BR-07 trigger `rules_version_immutable` (`1728100000000_b5-rules.cjs` lines 54–56) raises unconditionally — no `WHEN` clause, no role test — so it binds the migration role (superuser/owner) exactly as it binds an application role. The rollback was inert: it aborted on its first statement with an exception that read like a bug rather than like the design constraint it is. **[OBSERVED-C]**

**Compounding factor, not previously recorded.** Irreversibility does not rest on the trigger alone. `rules.rule_version.rule_id REFERENCES rules.rule_set(rule_id)` carries no `ON DELETE` clause (`b5-rules.cjs` line 41; no `ON DELETE` appears anywhere in the migration set), so the default `NO ACTION` pins the parent rows. The second `DELETE` was unreachable even if the first were removed: **no partial rollback of b5a exists**, and irreversibility is total rather than an artifact of the trigger. **[OBSERVED-C]**

**Why it mattered.** `down` asserted a reversibility it could not deliver, and failed in a way that invited repair of the symptom — disabling the trigger — rather than recognition of the constraint.

## 4. Disposition

D-2026-049 ruled that BR-07's append-only guarantee **binds all database actors, migrations included**, with no privileged migration exception, and extended that ruling to **BR-20** (`vault.disclosure_version`).

The decisive structural argument: `b5-rules.cjs` line 60 (`REVOKE UPDATE, DELETE, TRUNCATE ... FROM PUBLIC`) already stops every application role, so the triggers at lines 54–59 add nothing *except* binding owner and superuser. Reading BR-07 as application-only would leave the trigger layer decorative — a control retained in source that stops only what was already stopped. **[INFERRED]**, from the two-layer construction.

**BR-20 requires no code change.** `1728000000000_b4-vault.cjs` lines 53–64 are a byte-for-byte parallel over Zone-1 confidential disclosure history, but its `down` is `DROP SCHEMA vault CASCADE` — DDL that never reaches the trigger. The ruling closes that question by statement, not by repair. **[OBSERVED-C]**

**Standing consequence.** Any future migration seeding `rules.rule_version` or `vault.disclosure_version` is irreversible and must declare itself so. Corrections to published rule data are forward-only: a superseding version row, never an edit or a delete.

## 5. Remediation as implemented

1. `exports.down` rewritten to throw immediately, naming the constraint, the governing decision and the recovery path, with an explicit prohibition on disabling the trigger or adding `ON DELETE CASCADE`. The additive DDL from `up` (the `fee_schedule` table, the nullable `rule_set` columns) is deliberately **not** dropped: it is harmless to leave, and a transaction that must abort at its first statement is worse than refusing at the door. **[OBSERVED-C]**
2. One `it` added to `server/test/fitness.static.test.ts` — the suite's deliberately DB-free file — asserting that `down` is exported as a function and that invoking it throws a message matching `/IRREVERSIBLE/` and `/BR-07/`. **[OBSERVED-C]**

The function check earns its place: node-pg-migrate aliases `down` to `up` when `down` is undefined (`migration.js` `_getAction`), so deleting the export rather than throwing would silently re-run the seed on rollback. **[INFERRED]**, from the installed package source.

## 6. Evidence captured

**Floor runs.** Two full `npm run verify` runs on `ritz`, both `VERIFY_EXIT=0` / `VERIFY: PASS`, thirteen gates green. Run 1 gate 8 `138 passed`; run 2, with the regression test present, gate 8 `139 passed`. Client tests unchanged at 215. **[OBSERVED-A]** — read from `n2-verify.log` and `n2-verify2.log`. These are the first recorded full-floor passes and supersede D-2026-047's note that gates 8, 9 and 10 had never been run.

**Disposable-PostgreSQL check — the only end-to-end database evidence.** Container provisioned from `postgres:16-alpine`; `node-pg-migrate up` of all seven migrations exit 0; `node-pg-migrate down 1` **exit 1**, surfacing the intended error with the stack at `…b5a-authoritative-mvp.cjs:186` → `Migration._apply` → `runner`. Post-failure state captured intact: `pgmigrations` retained all 7 rows including the b5a row; `rules.rule_version` retained all 5 rows (3 authoritative, 2 representative). The runner's `> Rolling back attempted migration ...` line records the `singleTransaction` rollback path. **[OBSERVED-A]** — `n2-down.log`.

**Regression test execution.** Confirmed executed and passed **by name** under Vitest v2.1.8: `REGRESSION_EXIT=0`, verbose reporter, 5 of 5 in the file, 507 ms, **with no database provisioned**. **[OBSERVED-A]** — `n2-regression.log`.

> **The regression test does not verify any database invariant.** It exercises the migration module in isolation. It does not exercise the BR-07 trigger, the `NO ACTION` foreign key, the grants, or any PostgreSQL behaviour. It guards exactly one regression: that `down` keeps throwing rather than being deleted or neutralised. **All database-invariant evidence in this audit rests solely on the disposable-PostgreSQL check above**, which ran against a container that was destroyed.

**Local checks.** `node --check` on the migration exit 0; `npx tsc -p tsconfig.server.json --noEmit` exit 0 with the test in place; the three test assertions independently evaluated true against the migration at sha256 `13dac35e…aa4220`. **[OBSERVED-C]**

## 7. Limitations and residual risk

1. **The database invariants are now Floor-covered; the end-to-end path is not.**
   `server/test/ruleVersionImmutability.test.ts` asserts at gate 8 that the BR-07 trigger blocks
   UPDATE/DELETE/TRUNCATE for a privileged writer and that the NO ACTION foreign key pins the parent
   `rule_set` row. Added 26 Oct 2026; named Vitest run 27 Oct 2026, 2 of 2 passed (`NAMED_EXIT=0`)
   against a disposable PostgreSQL whose database name, seven applied migrations, seeded
   `IN-FER-RESP-BASE` row and both BR-07 triggers were asserted before the run; full suite 139 → 141.
   **[OBSERVED-A]** What remains uncovered is `node-pg-migrate down` end to end — no Floor gate runs
   it, so that evidence is still the one-shot disposable-container check, **not automatically
   exercised by the current Floor**. The **zone-grant layer** is covered too, by a third test
   asserting Zone 2 is refused on permission rather than by the trigger (27 Oct 2026; 3 of 3 named,
   full suite 141 → 142). **[OBSERVED-A]**
2. **The regression test does not run under `verify:fast`**, which skips gate 8. Only a full `npm run verify` reaches it.
3. **The migration file is untypechecked.** `tsconfig.server.json` sets neither `allowJs` nor `checkJs`, so the `.cjs` is outside gate 7.
4. **All run evidence is [OBSERVED-A], not [OBSERVED-C].** Claude did not execute the Floor runs or the PostgreSQL check and cannot independently attest to the execution environment.
5. **The three modifications were uncommitted when the evidence was produced.** At the time of the recorded runs, HEAD was `09f0be8` and the three files were modified and uncommitted; every result in §6 was produced against that working tree. **This is a statement about the state at capture, not about the state at review or acceptance** — the repository may have moved since, and any commit, rebase or amendment would require the evidence to be re-produced.
6. **D-2026-047's P2 premise is now historically inaccurate.** This work applied b5a to a database for the first time within that attestation's scope, carrying the corrected INR 1750 figure and not the superseded 1760. No state persisted — the container was torn down — so D-2026-047's contingency is not triggered and continues to stand for any other environment. Its three NOT CHECKED possibilities are unchanged and were never independently verified. **[OWNER-REPORTED]**
7. **Sibling findings unknown.** Per §1, this document discharges N-2 and nothing else.

## 8. Conclusion

Within the scope declared at §1, **finding N-2 is closed.**

The defect is characterised and its full mechanism recorded, including the foreign-key factor that the original finding did not capture. The governing question it raised — whether BR-07 binds migrations — is decided at D-2026-049 and extended to BR-20. The remediation is implemented, the intended failure mode has been exercised against a real PostgreSQL and behaved as designed, and a Floor-resident regression test guards the most likely reintroduction path and passes.

The **principal residual risk is now the absence of Floor coverage for the end-to-end rollback
path**, per §7.1: the BR-07 trigger and the foreign key are exercised at gate 8 on every full verify,
but nothing in the Floor runs `node-pg-migrate down` against a database. Separately, the evidence
assembled here **does not rule out other defects**, in the remediation or in B5a — it was gathered
to characterise and dispose of N-2, not to search for faults, and §7 records the further limits on
its reach. Closing N-2 retires neither concern, and this audit does not recommend treating gate-8
coverage of the trigger and the foreign key as coverage of the migration's rollback behaviour end
to end.

**No conclusion is offered on B5a.** Accepting this document closes N-2 and leaves the B5a post-implementation audit, as a whole, unrecorded.
