# Product Philosophy

**Type:** Living document
**Status:** Populated 25 July 2026 under Decision A2, by extraction from existing repository sources only. No new content was created.
**Sources:** Phase 2 §3, §5.3; Assessment Lifecycle ADR §3

**Relationship to other documents.** This document records *philosophy* — the reasoning that shapes decisions. Permanent design constraints are recorded in `01_Strategy/Architecture Principles.md`, which is the canonical principles document. Where the two touch the same ground, the canonical document governs.

---

## The Seven Core Principles

Phase 2 §3 records these as constraints rather than slogans: "each one forecloses a decision, which is how you tell a real principle from a wall poster."

### 1. Provenance over persuasion

No AI-generated claim, prior-art reference, novelty assessment or drafting suggestion appears in the product without a link to the source document and the specific passage. *If we cannot cite it, we do not show it.*

Recorded as "the single decision that most determines whether professionals will trust us."

### 2. The record is the product; transactions feed it

Everyone else sells a search, a draft, a filing — discrete transactions with no memory. ALDASSIST sells a permanent, compounding record of what someone invented. Every transaction must leave the record richer. Any feature that generates revenue but adds nothing to the record is a distraction.

### 3. Honest arithmetic, including when it costs the sale

Tell people not to file. Tell people to abandon patents they already own. Show the twenty-year cost before the filing fee. Recorded as "the only durable differentiator in a market where nobody can evaluate what they bought."

### 4. Humans hold the liability; AI holds the workload

Every output that carries legal consequence passes through a named, licensed human who is accountable for it. The AI compresses fifteen hours of reading into fifteen minutes. It does not sign anything. Recorded as something to say loudly rather than hide.

### 5. Calm is the design language

The industry communicates through density and fear. The differentiation is removal: fewer options, one obvious next action, generous space, no urgency theatre, no countdown timers, no "95% success rate." *Confidence is quiet.*

### 6. Recruit the incumbents; don't displace them

Every small patent agent is a competitor not to be beaten and capacity not to be hired. Give them tooling free, give them work, take a share. Recorded alternative — outbidding thousands of small firms on advertising — is "a war of attrition we lose."

### 7. Free where it compounds; paid where it converts

Search, status tracking, alerts, education, cost modelling and disclosure capture are free forever. They build habit, trust and the record. Charge at the point of professional work and ongoing custody. **Never charge for the thing that makes the record grow.**

---

## Brand Attributes

Phase 2 §5.3 records the brand position as *"the most competent and most honest participant in a category built on opacity,"* with attributes in priority order — and, importantly, what each forbids:

| Attribute | How it shows up | What it forbids |
|---|---|---|
| **Honest** | Published pricing, lifetime cost model, "don't file" verdicts, disclosed limitations, disclosed AI models | Unverifiable statistics, "starting from ₹X", hidden fees |
| **Precise** | Source-linked everything, exact deadlines, named accountable humans | Vague reassurance, "success rate" claims |
| **Calm** | Space, restraint, one clear next action, no urgency theatre | Countdown timers, popups, scarcity claims |
| **Technical** | Speaks to engineers as engineers; explains claims properly | Dumbing down; also, unnecessary legalese |
| **Warm at the edges** | Plain-language explanation, patience with first-timers, multilingual | Coldness; institutional distance |

**Tone test** *(Phase 2 §5.3)*: if a sentence could appear on a competitor's site unchanged, rewrite it.

---

## Assessment Operating Principles

Assessment Lifecycle ADR §3 records five principles governing the assessment lifecycle specifically:

1. **The assessment is the conversion engine, not a paid product.** Its job is to earn trust and move an inventor from uncertainty to a decision.
2. **Human review is never skipped, never sampled, never deferred into a later paid step.** A verdict reaches a client only after a named Verified Agent has reviewed and released it.
3. **Review access is the narrowest grant that permits the task.**
4. **An assessment is not an engagement.** Reviewing an assessment creates no client–agent relationship and no obligation on either party to proceed together.
5. **The reviewer and the eventual drafter may be different people, by design.**

---

## Placeholder

Phase 2 §5.1 records an argument against "the Apple of patent services" as a North Star and proposes Stripe and Wise as models instead. That reasoning is recorded in Phase 2 and is not restated here, because no repository source elevates it to a philosophy statement.
