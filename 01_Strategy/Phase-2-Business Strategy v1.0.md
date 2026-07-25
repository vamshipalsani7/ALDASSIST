# Phase 2 — Positioning, Business Model & Product Strategy

**Builds on:** Phase 1 — Competitive Intelligence & Strategic Landscape
**Date:** 23 July 2026
**Status:** Strategic decisions taken. Phase 3 (product architecture) can be built directly from this.

---

> **Historical notice (Decision G).**
> This is a **frozen historical document**, preserved unaltered. Its terminology is historical and retained deliberately; current terminology is governed by `01_Strategy/Glossary.md`.
> **The Assessment Lifecycle ADR supersedes this document** on assessment, payment and review sequencing. Specifically: the assessment is free to the client and precedes any payment or Engagement (ADR §7), and §13.4's conversion metric measures *released assessment → paid filing engagement* (ADR §12).
> Sections carrying their own superseded notices: **§10.3** (unit economics) and **§20** (success metrics).
> Canonical metric definitions are in `01_Strategy/Metrics.md`. Where this document conflicts with the ADR or a living document, those govern.

---

## 0. Assumptions I'm working under

You didn't answer the seven questions at the end of Phase 1, so I've made the calls myself and flagged them. If any of these is wrong, tell me which one and I'll re-cut the affected sections — most of them are load-bearing.

| # | Assumption | Confidence | If wrong, what changes |
|---|---|---|---|
| 1 | You do **not** currently hold a registered patent agent licence, and no co-founder does | Medium | §11 collapses to a simpler answer; timeline accelerates ~12 months |
| 2 | You are **India-based** and will build the team in India | High | §12 entirely |
| 3 | Capital is **constrained** — bootstrapped or pre-seed, not a funded 24-month runway | Medium | §13 and §14 sequencing; a funded version front-loads the software layer |
| 4 | You have **no existing agent network, client base or filed matters** | Medium | §17 and §18 — an existing network would let you skip 9–12 months |
| 5 | You want a **venture-scale outcome**, not a lifestyle services firm | High | Everything |

One correction before we start. Three numbers in this document — Indian annual filing volume, official fee schedules, and the size of the registered patent agent register — are from my general knowledge and **must be verified against current IP India data and the Patent Rules before anything financial is committed.** I've marked them `[verify]`. The strategic conclusions don't hinge on the exact values, but the model does.

---

## 1. Mission

> **To make the protection of an invention as reliable, transparent and affordable as sending money — so that the value of what people invent is determined by the quality of the idea, not the depth of the pocket or the luck of finding a good agent.**

The reason for that phrasing: the patent system today is a lottery dressed as a legal process. Two inventors with identical inventions get radically different outcomes depending on who drafted their claims, whether they searched properly before disclosing, whether they understood renewal costs, and whether anyone told them the truth about their odds. That variance is the enemy. Everything we build should reduce it.

**Not the mission:** "democratize IP." That phrase means nothing and is used by every competitor in the Indian market. Democratization is a side effect of reducing variance and cost, not a strategy.

---

## 2. Vision

**Ten-year vision:**

> **The system of record for the world's inventions — the place where an idea is first written down, assessed, protected, tracked, defended and eventually monetized, with every step traceable to its evidence.**

Three things that must be true for this to have happened:

1. **Custody.** A meaningful share of the world's active patent portfolios have their deadlines, documents and decision history living on our platform. Not because we're cheapest, but because moving off is dangerous.
2. **Judgement.** When someone asks "is this worth protecting, and what will it cost me over twenty years," our answer is the one they trust — including when the answer is no.
3. **Liquidity.** Patents that sit on our platform find licensees, buyers and partners more often than patents that don't.

If we get (1) and (2) we are a large, durable, profitable company. (3) is what makes it a very large one, and it is the least certain of the three.

---

## 3. Core philosophy

Seven principles. These are constraints, not slogans — each one forecloses a decision, which is how you tell a real principle from a wall poster.

**1. Provenance over persuasion.**
No AI-generated claim, prior-art reference, novelty assessment or drafting suggestion appears in the product without a link to the source document and the specific passage. *If we cannot cite it, we do not show it.* This kills the "confident summary with no sources" pattern that every generic AI tool defaults to, and it is the single decision that most determines whether professionals will trust us.

**2. The record is the product; transactions feed it.**
Everyone else sells a search, a draft, a filing — discrete transactions with no memory. We sell a permanent, compounding record of what someone invented. Every transaction must leave the record richer. Any feature that generates revenue but adds nothing to the record is a distraction.

**3. Honest arithmetic, including when it costs us the sale.**
We will tell people not to file. We will tell people to abandon patents they already own. We will show the twenty-year cost before we show the filing fee. Short-term this loses revenue. Long-term it is the only durable differentiator in a market where nobody can evaluate what they bought.

**4. Humans hold the liability; AI holds the workload.**
Every output that carries legal consequence passes through a named, licensed human who is accountable for it. The AI compresses the fifteen hours of reading into fifteen minutes. It does not sign anything. We say this loudly rather than hiding it — the alternative is a professional-negligence claim we cannot survive.

**5. Calm is the design language.**
This industry communicates through density and fear. Our differentiation is removal: fewer options, one obvious next action, generous space, no urgency theatre, no countdown timers, no "95% success rate." Confidence is quiet.

**6. Recruit the incumbents; don't displace them.**
Every small patent agent is a competitor we don't have to beat and capacity we don't have to hire. Give them tooling free, give them work, take a share. The alternative — outbidding thousands of small firms on Google Ads — is a war of attrition we lose.

**7. Free where it compounds; paid where it converts.**
Search, status tracking, alerts, education, cost modelling and disclosure capture are free forever. They build habit, trust, SEO and the record. We charge at the point of professional work and ongoing custody. Never charge for the thing that makes the record grow.

---

## 4. Product positioning

**Category:** We are not a patent filing service, a search engine, an IP management system, or an AI tool. Those categories are all occupied and all commoditizing.

**We are the operating layer between an invention and the patent system.**

**Positioning statement:**

> For inventors, startups and research institutions who need to protect what they've built but can't tell good advice from bad, **[Platform]** is the invention record that assesses, protects and tracks your IP end to end — with every AI conclusion traceable to its source and every cost known before you commit. Unlike filing services that sell you a document and disappear, or intelligence platforms built for people who already have IP departments, we stay with the invention for its entire twenty-year life.

**The three-part product architecture** (Phase 3 will detail each):

| Layer | What it is | Business role |
|---|---|---|
| **The Record** | Disclosure capture, document vault, docket, deadline engine, portfolio view | Custody. The switching cost. Free-to-cheap. |
| **The Judgement** | AI assessment with human verification — novelty, patentability, cost modelling, abandon/renew decisions, FTO | Differentiation. The trust engine. Paid. |
| **The Work** | Drafting, filing, prosecution, renewals, delivered by verified agents | Revenue and margin. Where the money is today. |

Competitors own one layer. PatSnap owns Judgement for organizations that already have IP capability. Anaqua owns Record for enterprises. Indian firms own Work with no Record and no Judgement. **The integration is the product.**

**What we explicitly are not, and will say so:**
- Not a law firm (see §11)
- Not a replacement for a patent attorney
- Not a patent search engine competing with Google Patents
- Not a landscape/analytics tool competing with PatSnap
- Not an IP management system competing with Anaqua at enterprise scale — yet

---

## 5. Brand positioning

### 5.1 I want to challenge "the Apple of patent services"

You've used this phrase twice and I think it's the wrong North Star, for three reasons.

**First, Apple's premium is enabled by hardware margin and ecosystem lock-in, neither of which we have.** Apple can spend enormously on design because a phone costs $200 to make and sells for $1,200. We are a services-heavy, regulated, human-in-the-loop business with 45–70% gross margins. Design excellence is achievable; Apple-scale design investment is not, and pretending otherwise leads to a beautiful product with unfixable unit economics.

**Second, Apple's design philosophy is about desire.** People buy iPhones because they want them. Nobody wants a patent. They want the anxiety to stop. That is a fundamentally different emotional register — closer to insurance or healthcare than consumer electronics. Aspirational, seductive design in this category reads as untrustworthy: if it looks like it was made to sell me something, I trust it less.

**Third, and most practically — "premium" in a market where nobody can judge quality is a positioning trap.** If the buyer cannot evaluate the product (and in patents they cannot, for 3–5 years), then charging a premium without a *verifiable* quality signal is indistinguishable from overcharging. Every Indian firm already claims premium quality. The word is dead.

### 5.2 The two brands worth modelling instead

**Stripe.** They entered a category dominated by opaque, sales-led, enterprise-contract incumbents and won by being radically better at the boring things: documentation, honest pricing published on a page, developer respect, and an obsession with the plumbing working perfectly. Their design is beautiful *and* their design is restrained, technical and functional. They earned premium by being obviously more competent, not by being more desirable.

**Wise (formerly TransferWise).** They entered a category built on hidden fees and won on one thing: showing the true cost before you commit, including the part everyone else hides. They made honesty the product. That is precisely our §3.3 principle, and precisely the gap Phase 1 identified in patent lifetime cost transparency.

### 5.3 The brand position

> **The most competent and most honest participant in a category built on opacity.**

Attributes, in priority order:

| Attribute | How it shows up | What it forbids |
|---|---|---|
| **Honest** | Published pricing, lifetime cost model, "don't file" verdicts, disclosed limitations, disclosed AI models | Unverifiable stats, "starting from ₹X", hidden fees |
| **Precise** | Source-linked everything, exact deadlines, named accountable humans | Vague reassurance, "success rate" claims |
| **Calm** | Space, restraint, one clear next action, no urgency theatre | Countdown timers, popups, "only 3 slots left" |
| **Technical** | We speak to engineers as engineers; we explain claims properly | Dumbing down; also, unnecessary legalese |
| **Warm at the edges** | Plain-language explanation, patience with first-timers, multilingual | Coldness; institutional distance |

**Tone test:** if a sentence could appear on a competitor's site unchanged, rewrite it.

---

## 6. Why this company should exist

Three arguments, in ascending order of strategic weight.

### 6.1 The system is catastrophically lossy at both ends

India files roughly **90,000–95,000 patent applications a year** `[verify against current IP India Annual Report]` — a country with 1.4 billion people, one of the world's largest engineering graduate outputs, and rapidly growing R&D spend. China files in the region of 1.5–1.7 million. The US around 600,000.

The gap is not talent. It is friction, cost opacity, and the near-total absence of trustworthy guidance at the point where someone decides whether to bother.

And at the other end: a very large share of granted Indian patents lapse for non-payment of renewal fees, often because the owner never understood the escalating annuity schedule when they filed. We are losing inventions at the front of the funnel because people don't know where to start, and losing granted assets at the back because people didn't know what they were signing up for.

**A company that widens both ends of that funnel is creating value, not redistributing it.** That matters for durability — you can be attacked on price, but it's much harder to attack someone who is growing the market.

### 6.2 This is a lemons market, and lemons markets are won structurally

This is the most important idea in this document, so I'll be explicit about it.

Patent services have the classic structure Akerlof described: **the buyer cannot evaluate quality at the point of purchase, and often cannot evaluate it years later.** A badly drafted claim looks identical to a well-drafted one to a founder. The consequences surface 3–5 years later during examination or, worse, 10 years later during litigation, and by then the causation is impossible to attribute.

In markets with this structure, three things happen predictably:
1. Price becomes the only visible signal, so quality gets bid down
2. Sellers compete on trust *theatre* — logos, testimonials, unverifiable percentages (exactly what Phase 1 found across the Indian cluster)
3. Good practitioners are undercut by bad ones and either exit or stop investing in quality

**The company that solves this doesn't win by being better. It wins by being the first to make quality visible.** Concretely: outcome data per agent (objection rates, first-action allowance rates, claim-scope retention, time-to-grant, by technology area), a transparent process, source-linked reasoning, and guarantees that only a confident party would offer.

That is a *structural* win. It cannot be copied by a competitor writing better ad copy, because it requires years of accumulated outcome data. It is the single most defensible thing available to us.

### 6.3 The AI window is open and will close

The technology to compress prior-art analysis, claim comparison and first-draft generation from days to minutes now exists and is cheap. The incumbents know this — PatSnap has rebuilt around agents, Questel has an AI Lab. But their AI is aimed at organizations that *already have IP capability*, because those organizations pay six figures.

**Nobody has pointed this technology at the front of the funnel** — the person who doesn't yet know whether they have anything worth protecting. That gap exists because it's a low-ARPU segment that enterprise vendors structurally cannot serve. It will not stay open forever: once someone proves the model works, the incumbents will buy or build into it.

The window is realistically **24–36 months**.

---

## 7. Jobs to be Done

I've separated these by layer, because we systematically over-index on functional jobs and under-index on emotional ones — and in this category the emotional job is the one that gets people to pay.

### 7.1 Functional jobs

| # | Job | Currently served by | Quality of current solution |
|---|---|---|---|
| F1 | *Tell me whether this idea is even worth protecting* | Nobody honest — every firm is incentivized to say yes | **Terrible** |
| F2 | *Tell me what this will cost me over its entire life, not just to file* | Nobody | **Non-existent** |
| F3 | *Get it drafted and filed correctly, on time, without me learning patent law* | Indian firms, law firms | Adequate but opaque |
| F4 | *Never let me miss a deadline* | Docketing systems (enterprise only) | Good for enterprises, absent below |
| F5 | *Tell me what's happening with my application* | Email, phone calls | **Terrible** |
| F6 | *Tell me which of my patents to abandon* | Nobody (misaligned incentives) | **Non-existent** |
| F7 | *Tell me if someone is infringing, or if I'm about to* | IP8, PatSnap, search firms | Good but expensive and enterprise-only |
| F8 | *Help me turn this into money* | Innoget, NineSigma, brokers | Poor liquidity |
| F9 | *Search the corpus* | Google Patents, Espacenet, Lens | **Excellent and free — do not compete here** |

**Read the table:** F1, F2, F5 and F6 are unserved or badly served, and they are precisely the jobs an incumbent is *structurally disincentivized* to serve well, because honest answers reduce billable work. That misalignment is our entry point.

### 7.2 Emotional jobs — the real ones

- **"Stop me feeling stupid."** Most inventors' first contact with the patent system involves being made to feel ignorant. Every interaction should leave someone more capable, not more dependent.
- **"Stop the silence."** The gap between filing and first examination in India can run to years. Notice from Phase 1 that every single testimonial across every Indian firm praised *communication*, not drafting quality — because communication is the only thing the client can actually perceive. **The anxiety of multi-year silence is the central emotional job in this industry and nobody has designed for it.**
- **"Let me trust someone."** In a market where I can't judge quality, give me a reason to believe that isn't a logo wall.
- **"Don't let me be the person who lost the patent."** Fear of irreversible error — publishing before filing, missing a deadline, disclosing to the wrong person.

### 7.3 Social jobs

- *"Let me tell investors we have defensible IP"* — startup founder, and a genuinely large purchase driver
- *"Let me show my department I'm productive"* — academic researcher, where filings count toward institutional metrics
- *"Let me justify this budget to my CFO"* — corporate IP head, needs data not adjectives

### 7.4 The strategic conclusion from JTBD

**The product is not "patent filing." The product is confident decision-making under uncertainty, sustained over twenty years.**

That reframing changes the roadmap. It means the assessment layer and the deadline/status layer are more strategically important than the drafting layer — even though drafting is where the revenue looks biggest today.

---

## 8. Target audiences, prioritized

Your brief lists ten audiences. Building for ten audiences produces the exact failure mode Phase 1 documented at Questel and Anaqua: twenty product names and no coherent story. Here is the prioritization, with reasoning.

### Tier 0 — Strategic free users (never a profit centre, permanently subsidized)

**Students · individual inventors · independent researchers**

- **Why include them:** They are the mission, the SEO engine, the brand's moral authority, and — critically — **they become Tier 1 in five to ten years.** A student who used our free search in their final year becomes a startup founder who files with us. This is a distribution and trust investment, not a market.
- **Why they cannot be a profit centre:** willingness to pay is genuinely low, service intensity is genuinely high, and the honest advice for most individual inventors is "don't file." Charging them well requires either lying to them or underserving them.
- **Serve them with:** free search, free status tracking, free education, free cost modelling, free disclosure capture. Nothing that requires human hours.
- **Be honest internally:** if this cohort ever exceeds ~5% of human-service capacity, we are running a charity inside a company. Automate or decline.

### Tier 1 — Build for these first (Months 0–18)

**1a. Deep-tech startups and technology SMEs**

The core paying segment. They have budget (often investor money earmarked for IP), genuine urgency (funding rounds and product launches create hard deadlines), repeat need (2–6 filings over three years), and they are *already* comfortable buying software self-serve. They also have the exact pain we solve best: they cannot evaluate patent quality and they know it.

**1b. Registered patent agents and small IP firms — the supply side**

This is the audience your brief lists ninth and which I'd argue is second-most-important. Here's why: **our ability to scale is hard-capped by registered agent capacity.** India has on the order of a few thousand actively practising registered patent agents `[verify against the Register of Patent Agents]`. We cannot hire our way past that constraint at speed, and we cannot legally route around it.

Every agent we recruit is simultaneously: capacity we didn't hire, a competitor we didn't have to beat, a source of outcome data, and a distribution channel to their existing clients. Giving them free docketing, deadline management, client portals and AI drafting assistance is the highest-leverage spend in the entire business.

**They must be treated as a first-class user with a purpose-built product, not as "vendors."**

### Tier 2 — Year 2

**2a. Universities, research institutions and TTOs**

Highest *volume* of inventions per rupee of budget in India, structurally underserved (Phase 1 §5.8), and institutionally sticky — once a university's disclosure workflow lives with you, it stays for a decade. They also solve the publication-vs-filing race condition, which is a genuinely painful unserved problem. And there's an important second-order effect: **a university adoption converts its entire faculty and student body into Tier 0 users, and its spinouts into Tier 1 customers.**

Deferred to Year 2 only because institutional sales cycles are 6–12 months and we need a track record first.

**2b. Corporate R&D teams and mid-market IP heads (portfolios of 20–200 assets)**

Too big for a solo agent, too small for Anaqua. They currently run their portfolio on spreadsheets and three outside firms. This is the segment where the Record layer becomes worth real money and where renewal management becomes a recurring revenue base.

### Tier 3 — Year 3+

**3a. Large enterprises** — require SSO, audit logs, on-prem/data-residency options, security questionnaires, procurement cycles and references. Attempting this before we have the compliance posture wastes a year.

**3b. Large law firms** — will only adopt after our tooling is demonstrably better than what they have, and they are the most conservative buyers in the industry.

**3c. International outbound clients (US/EU companies using India-delivered work)** — this is the MaxVal model and it is where the *margin* is (see §12). It requires operational credibility we won't have on day one, but it should be a deliberate Year 2–3 target, not an accident.

### The prioritization in one line

> **Sell to startups. Build for agents. Court universities. Ignore enterprises until we've earned them. Subsidize inventors because it's right and because it compounds.**

---

## 9. Ideal Customer Profiles

Six personas. The first four are the ones Phase 3 must design for.

---

### ICP-1 — Arjun · 27 · Co-founder & CTO, deep-tech startup · Bengaluru
**Tier 1a — the primary revenue persona**

Three-person team, seed round closed four months ago. Built a novel signal-processing approach for low-cost industrial sensing. His lead investor asked "what's your IP position?" in the last board meeting and he didn't have a good answer.

- **Technical depth:** high in his domain, zero in patent law
- **Budget:** ₹3–8 lakh earmarked for IP over 18 months
- **Frequency:** 2–5 filings over three years, plus international phase decisions
- **Where he is now:** got three quotes ranging from ₹45k to ₹2.1L for "the same thing," has no idea why they differ, is paralyzed
- **What he actually fears:** filing something so narrow it's worthless; or spending ₹5 lakh on something an examiner rejects under s.3(k) as a computer program per se
- **What wins him:** a straight answer on patentability with the prior art shown to him, a total-cost figure including US and PCT, and a named agent with visible technical background in his field
- **What loses him:** a lead form; a phone call he didn't ask for; the word "affordable"
- **Retention hook:** the docket. Once his deadlines live with us he is not moving.

---

### ICP-2 — Priya · 34 · Registered patent agent, solo practice · Hyderabad
**Tier 1b — the supply persona. Arguably the most strategically important user in the business.**

M.Tech in electronics, registered patent agent for six years, left a mid-size firm to go independent. Handles 35–50 live matters.

- **Her docket is an Excel sheet and Google Calendar reminders.** She has a recurring nightmare about missing a national-phase deadline.
- **Time split:** roughly 40% on formalities, status checks, client status emails and IP India portal wrangling; 35% on actual drafting and prosecution; 25% on trying to find clients
- **Income:** ₹18–30 lakh/year, capped entirely by her own hours
- **What she wants:** more matters, less administration, and to stop being the bottleneck on her own income
- **What she fears:** a platform that commoditizes her, dictates her fees, or exposes her to liability for AI output she didn't verify
- **What wins her:** free docketing and deadline automation that is *better than what firms pay for*, a stream of pre-qualified matters where the disclosure is already structured, and AI drafting assistance that she controls and edits
- **What loses her:** being called a "vendor"; opaque matching; a take rate that arrives before the value does
- **Our promise to her:** *"We'll double the matters you can handle without doubling your hours, and we'll never let you miss a date."*

---

### ICP-3 — Dr. Meera · 44 · Associate Professor, Materials Science · Pune
**Tier 2a — the institutional volume persona**

Publishes 6–8 papers a year, runs a DST-funded lab with four PhD students, sits adjacent to a nascent institutional TTO with one overworked administrator.

- **Her core conflict:** she is measured on publications, so publishing is always urgent and filing is never urgent — until she realizes she disclosed at a conference last month and destroyed her own novelty
- **Personal budget: zero.** Institution pays, slowly, through a process nobody understands
- **Volume:** her department could generate 20–40 disclosures a year; it currently generates 3
- **Ownership confusion:** who owns it — her, the institution, the funding agency? Nobody has explained it
- **What wins her:** a disclosure form that takes 20 minutes and timestamps her invention immediately; an automated check against her own upcoming publications; plain-language ownership guidance
- **The institutional buyer above her** is a Dean or Director of Research who wants filing numbers to report and doesn't want to manage the process
- **Why she matters disproportionately:** her students are Tier 0 today and Tier 1 in five years, and her spinout is Tier 1a tomorrow

---

### ICP-4 — Ravindra · 52 · Head of IP (a department of one) · mid-size manufacturer · Pune
**Tier 2b — the recurring revenue persona**

42 granted patents, 15 pending, across India, US, Germany and China. Reports to the CTO. Uses three different outside firms and one annuity provider.

- **His week:** chasing status updates, reconciling invoices from three firms, and defending his budget with data he doesn't have
- **His hardest recurring decision:** which patents to let lapse at renewal. He currently decides on gut feel because nobody gives him usage or competitive data
- **Budget:** ₹60 lakh–₹1.5 crore a year in total IP spend
- **What wins him:** one dashboard showing every asset, every deadline, every cost, across every jurisdiction and firm — plus a renewal recommendation with reasoning
- **Why he's the margin persona:** he brings a portfolio, which means renewals, which is the highest-margin recurring revenue in this industry (§10)

---

### ICP-5 — Suresh · 48 · Independent inventor, mechanical · Coimbatore
**Tier 0 — the mission persona. Be honest: this is a cost, not a market.**

Runs a small workshop, has designed a genuinely clever agricultural implement modification. Limited English. Has already been approached by two "patent consultants" who quoted ₹80,000 for something that should cost ₹25,000, and one who suggested filing without a search.

- **What he needs:** to be told the truth in Tamil, to understand the real cost, and not to be exploited
- **What he can pay:** ₹20,000–40,000, once, with difficulty
- **What we owe him:** the free layer, in his language, and an honest assessment — including "this has already been patented, don't spend the money"
- **Strategic value:** he is the reason the brand is credible. Every founder who watches us tell Suresh not to file trusts us more. But we must not build human-service workflows around him.

---

### ICP-6 — Kate · 39 · Associate GC (IP) · US mid-market medical devices company
**Tier 3c — the margin persona, Year 2–3**

Portfolio of ~90 assets, currently paying $12,000–18,000 per US non-provisional to an AmLaw 200 firm and looking hard at that line item.

- **What wins her:** the same output at 50–60% of the cost, delivered by verified professionals, with US-qualified sign-off and a security posture that survives her IT review
- **Why she matters:** every hour of Indian delivery capacity billed to her earns 3–5x what it earns billed to Arjun. **She is how India-cost-base becomes venture-scale revenue.**
- **What she requires before she'll talk:** SOC 2, references, and a named US-registered practitioner accountable for the work

---

## 10. Business model

### 10.1 Revenue streams, ranked by strategic value

| # | Stream | When | Gross margin | Strategic role |
|---|---|---|---|---|
| **R1** | **Fixed-fee professional work** (search, drafting, filing, prosecution) | Month 0 | **45–60%** | Pays the bills, builds trust, generates outcome data |
| **R2** | **Renewals & annuity management** | Month 9 | **80–90%** | The sleeper. Recurring for 20 years, near-zero marginal cost |
| **R3** | **Portfolio subscription** (Record + monitoring + alerts) | Month 12 | **80–88%** | The custody layer. Low ARPU, extreme retention |
| **R4** | **Agent/firm SaaS** (docketing, drafting assistance) | Month 18 (free before) | **75–85%** | Supply-side lock-in and outcome data |
| **R5** | **Institutional contracts** (universities, corporates) | Year 2 | **65–80%** | Volume, credibility, multi-year |
| **R6** | **Outbound corridor** (international clients, India delivery) | Year 2 | **55–70%** | Where India's cost advantage converts to real revenue |
| **R7** | **Data & API** | Year 3+ | **90%+** | Platform economics, optional |
| **R8** | **Monetization marketplace take-rate** | Year 4+ | **90%+** | Highest upside, lowest probability |

**The single most under-appreciated line here is R2.** Renewal management is unglamorous: you track annuity due dates across jurisdictions, you remind the owner, you pay the office, you take a fee. Dennemeyer, Anaqua, Questel and MaxVal all do it because it is the most profitable, most recurring, most defensible revenue in the industry. It requires no creativity, it runs for twenty years per asset, the marginal cost approaches zero, and the switching risk to the customer (losing a patent) is so severe that churn is negligible.

**Build the renewals engine early. It is the annuity that funds everything else.**

### 10.2 Cost structure

| Cost | Nature | Notes |
|---|---|---|
| **Human professional time** | Variable, the dominant COGS | Agent fees or salaries. The whole AI thesis is about compressing this per matter. |
| **AI inference** | Variable, small relative to price | A full novelty analysis over 100 documents with reasoning is realistically a few dollars of tokens against a ₹15–25k price. **Inference is ~2–5% of revenue, not a constraint.** |
| **Data acquisition** | Fixed, potentially large | The strategic fork. See below. |
| **Engineering** | Fixed | Small team, high leverage |
| **Compliance & security** | Fixed, step-function | SOC 2 / ISO 27001 is roughly ₹15–40 lakh and 6–9 months. Required before Tier 2b/3. |
| **Professional indemnity insurance** | Fixed, non-negotiable | See §19.2 |
| **CAC** | Variable | Must be low. Content + free tools, not paid search bidding wars |

**The data acquisition fork — a real decision, not a formality:**

- **Option 1 — Build on open sources.** EPO OPS, USPTO bulk data, WIPO, IP India, Lens API. Cost: engineering, not licensing. Coverage is genuinely good for IN/US/EP/PCT full-text. Weaknesses: legal status reliability, family data consistency, non-English coverage, and IP India's data quality.
- **Option 2 — License commercial data** (Derwent-class curated abstracts and family data). Cost: likely six figures USD annually. Buys coverage and credibility.

**Recommendation: Option 1 for 24 months.** Our differentiation is judgement, provenance and workflow — not corpus completeness. We should be explicit in the product about what we cover and where our coverage is thin (per §3.3), which is more credible than pretending to global completeness we can't afford. Revisit at Series A when the enterprise segment demands it.

### 10.3 Illustrative unit economics

> **Superseded notice (Decision G).**
> The cost model below **omits one cost line**. Assessment Lifecycle ADR §8 records that reviewers are compensated by the platform for pre-engagement assessment reviews, making assessment review a **platform-borne COGS line**. ADR §12 records this explicitly as a correction to this section.
> The consequence, stated in ADR §8: each assessment carries a human-review cost independent of whether the client ever pays for a filing. Assessment volume therefore has a direct COGS impact.
> The table below is retained unaltered as the historical record. The mechanism and rate of reviewer compensation are configurable and legally gated — see `06_Legal/L1 Register.md`, entry **L1-21**.

`[All figures illustrative and to be validated against real quotes and real delivery cost]`

**A single India provisional + complete + prosecution to grant (ICP-1):**

| Line | Amount |
|---|---|
| Revenue (search + provisional + complete + one FER response) | ₹95,000 |
| Agent cost (55% share) | ₹52,000 |
| AI inference + platform | ₹1,500 |
| Support & operations | ₹6,000 |
| **Gross profit** | **₹35,500 (37%)** |
| *Plus* renewals, years 3–20 (fee-based, high margin) | ₹40,000–80,000 lifetime |
| *Plus* portfolio subscription | ₹12,000–24,000/yr |

Two things this table shows. First, **the initial transaction is barely profitable at a competitive price** — which is why anyone running this as a filing business alone will fail or cut quality. Second, **the lifetime value is 2–3x the first transaction**, and it's all in the recurring layer. That validates the whole "Record is the product" thesis: we lose the filing-only competitor on the first matter and beat them decisively over twenty years.

**The margin improves in exactly three ways**, and Phase 3 must be designed around them:
1. AI compresses agent hours per matter (target: 40% reduction in agent time within 18 months — measurable via §20)
2. Recurring revenue accumulates (renewals + subscriptions eventually exceeding transaction revenue)
3. Revenue mix shifts toward the outbound corridor, where the same delivery hour bills at 3–5x

### 10.4 Scalability — and the honest constraint

**What scales beautifully:** the Record, the search layer, the deadline engine, the assessment layer, renewals, all software.

**What does not scale:** registered agent capacity. This is a hard, legally-enforced ceiling and it is the single biggest constraint on the business.

Three levers, in order of importance:
1. **Recruit the supply side aggressively** (ICP-2) — free tooling, real work, fair economics
2. **Compress agent hours per matter with AI** — the core technical bet
3. **Move work down the qualification ladder where legally permissible** — technical analysts do the research; the registered agent reviews and signs

**Implication for Phase 3:** the agent-facing product is not a secondary surface. It is co-equal with the client-facing product, and arguably should be built first, because it determines our capacity ceiling.

---

## 11. Regulatory structure

### 11.1 The three options evaluated

**Option A — Pure technology company**

Software only. Users bring their own patent agent. We never touch regulated work.

| Pros | Cons |
|---|---|
| Cleanest legal position; no UPL exposure | Cannot deliver the end-to-end promise |
| Highest gross margin (75–85%) | Competes directly with PatSnap/Anaqua on their turf |
| Fastest to launch; no professional indemnity for advice | Abandons the segment we're strongest in |
| Fully global from day one | Lowest revenue per user; hardest to differentiate |

**Verdict:** structurally safe, strategically weak. It puts us in the crowded software fight without the data corpus to win it.

---

**Option B — Marketplace / managed network**

TechCo operates the platform. Regulated work is performed by independent registered patent agents and firms contracted to the platform. TechCo charges platform and software fees; agents charge professional fees.

| Pros | Cons |
|---|---|
| Delivers the end-to-end promise | Quality control is the hard problem |
| Scales capacity without hiring | Fee-sharing and referral rules need careful structuring |
| Turns competitors into supply | Margin shared with agents |
| Generates outcome data across many practitioners | Brand risk from a bad agent's work |
| Capital-light | Requires two-sided cold start |

**Verdict:** the right starting point. This is Dennemeyer's and MaxVal's structural logic and it is the only model that reaches scale from a standing start.

---

**Option C — Captive patent practice**

We establish or acquire a registered patent agent practice / IP law firm and deliver the work in-house.

| Pros | Cons |
|---|---|
| Full quality control | Slowest to build; capacity = headcount |
| Full margin capture | Advertising restrictions on regulated entities constrain marketing |
| Strongest client promise | Full professional liability exposure |
| Privilege available (where applicable) | Capital intensive; hardest to scale |

**Verdict:** correct destination for the premium tier, wrong starting point.

### 11.2 Recommendation

> **Start as B. Architect for B+C from day one. Add C in Year 2–3 as a premium tier and quality anchor.**

**The structure:**

```
                 ┌──────────────────────────────┐
                 │  [Platform] Technologies      │
                 │  Pvt Ltd  —  "TechCo"         │
                 │  Software · Data · AI ·       │
                 │  Brand · Marketing · Support  │
                 └───────────┬──────────────────┘
                             │  arms-length agreements
              ┌──────────────┴──────────────┐
              │                             │
   ┌──────────▼──────────┐      ┌───────────▼────────────┐
   │  Verified Agent      │      │  [Platform] IP LLP     │
   │  Network             │      │  (Year 2–3)            │
   │  Independent         │      │  Captive practice —    │
   │  registered agents   │      │  quality anchor &      │
   │  & small firms       │      │  premium tier          │
   └──────────────────────┘      └────────────────────────┘
```

**Why this structure specifically:**

1. **TechCo does the marketing.** Regulated professionals face advertising restrictions that a technology company does not. Keeping the brand and demand generation in TechCo is not a loophole — it is the standard, correct separation, and it's what lets us build a consumer-grade brand at all.
2. **Regulated work sits with regulated people.** Every filing, prosecution and legal opinion is performed and signed by a registered agent who is accountable for it. TechCo never gives legal advice.
3. **The captive practice can be added later without re-platforming**, because the agent network and the captive practice consume the same interfaces.
4. **It matches what actually works.** MaxVal runs Convergence IP Law inside the group. Dennemeyer separates "IP law firm" as its own pillar. Both arrived here for the same reasons.

### 11.3 The five legal questions that need specialist counsel before launch

I'm flagging these as questions, not answering them, because they are jurisdiction-specific and consequential enough that you need a specialist opinion, not a strategy document.

1. **Fee-sharing and referral.** How may TechCo be compensated by or alongside registered agents without contravening restrictions on sharing professional fees with non-professionals? *This determines whether our revenue model is a take-rate, a SaaS licence to the agent, or a technology fee to the client.* Get this answered first — it changes the pricing architecture.
2. **Advertising and solicitation rules** as they apply to the agent network's association with a marketed platform.
3. **UPL exposure** in every jurisdiction where we serve clients, particularly the US corridor.
4. **Privilege.** Platform-generated work product is very likely **not** privileged. IP8 discloses this proactively and we must too — prominently, in plain language, not buried in terms.
5. **Data residency and confidentiality** for pre-filing invention disclosures, including whether processing disclosures through third-party model providers creates a public-disclosure or confidentiality problem. This is existential (§19.4).

### 11.4 The non-negotiable disclosure

Adapted from the best practice Phase 1 found at eevatech and IP8, and it goes in the footer of every page and the onboarding of every user:

> *[Platform] Technologies is not a law firm and does not provide legal advice. Regulated patent work is performed by independent registered patent agents. Using this platform does not create an attorney–client relationship and does not extend legal privilege to information you share.*

Competitors will see this as a weakness. It is the opposite: it is the credibility that lets everything else we say be believed.

---

## 12. Geographic strategy

### 12.1 The recommendation

> **India-first for product, users, supply and cost base. US/EP-weighted for revenue, starting Year 2.**

Not "India first then expand." The two are simultaneous and deliberate, because they answer different questions.

### 12.2 Why India for building

1. **The underserved gap is largest here** and the competition is weakest (Phase 1 §3.1)
2. **IP India's public search is a decade behind Espacenet** and is a free, high-traffic wedge nobody has claimed
3. **Cost base advantage is structural** and compounds into every unit economic
4. **The regulatory path is navigable** from here in a way it isn't if we start by serving US clients
5. **Talent exists**: strong engineering plus a real pool of technically-qualified patent professionals
6. **Feedback loops are close** — we can sit with ICP-1 and ICP-2 in person

### 12.3 Why India cannot be the market — the TAM problem

This is the most important paragraph in Phase 2 and I want to state it bluntly, because it contradicts the implicit premise of the brief.

`[All figures illustrative — verify before use in any funding material]`

- India: ~90–95k patent applications/year × average lifecycle professional fees of ₹80,000–₹1,50,000 ≈ **₹750–1,400 crore (~$90–170M)** for the entire Indian patent prosecution services market, plus renewals.
- Even a dominant **30% share of the entire Indian patent services market is roughly $30–50M in revenue.**

**That is a good business. It is not a billion-dollar company.**

A venture-scale outcome therefore requires at least two of these three, and I'd argue all three:

1. **Global revenue** — serving international filings and international clients from an Indian cost base (the outbound corridor). Global patent activity runs to roughly 3.5 million applications a year, and the IP software and services market is in the **$8–12 billion** range.
2. **Moving up-stack** into portfolio custody, renewals, monitoring and monetization — where revenue is recurring and per-asset rather than per-filing.
3. **Expanding the definition of the asset** beyond patents into the full intangible-asset record (designs, trade secrets, software provenance, data rights) — later, and only once patents are won.

**If you internalize one thing from Phase 2: India is the beachhead and the factory. It is not the market.** Building as though India is the market produces a ₹200 crore company. Building as though India is the launchpad produces something much larger — and, importantly, the *product decisions are different from day one*: multi-jurisdiction data model, currency-agnostic pricing, jurisdiction-abstracted deadline rules, and English-first with Indian-language layers rather than the reverse.

### 12.4 Jurisdiction sequencing

| Phase | Jurisdictions | Rationale |
|---|---|---|
| **MVP** | India + PCT | Home market, one international pathway |
| **V2** | + United States | Largest fee pool; where the outbound corridor lives |
| **V3** | + EPO / selected EP states | Completes the standard corridor for Indian filers |
| **V4** | + China, Japan, Korea, GCC | Volume and Indian-client demand |
| **Later** | Everything else via agent network | Coverage without owning the rules engine |

**Design constraint for Phase 3:** the deadline/rules engine must be **jurisdiction-agnostic from the first line of code.** Retrofitting multi-jurisdiction logic into a system built for Indian rules is a full rewrite. This is the single most expensive architectural mistake available to us.

---

## 13. MVP

### 13.1 The principle

The MVP must prove exactly one thing: **that an inventor will trust an AI-assisted, human-verified assessment enough to pay for the filing that follows.**

Everything that doesn't test that hypothesis is out, however tempting.

### 13.2 What absolutely must exist

**A. The free wedge — Indian patent search & status layer**
Modern semantic + boolean search over Indian patents with reliable application status, document retrieval, and email/WhatsApp alerts on status change. Free forever, ungated, no login for search.
*Why it must exist:* it is the acquisition engine, the SEO asset, the trust demonstration, and the fix for the single most broken piece of public infrastructure in Indian IP. It costs us data engineering, not licensing.

**B. Structured invention disclosure capture**
A guided, confidential, timestamped disclosure workflow. Plain language. 20–30 minutes. Saves progress. Never publicly indexed.
*Why:* it is the entry to the Record, it creates the proprietary dataset, and it makes every subsequent step cheaper.

**C. AI novelty & patentability assessment with mandatory source-linking**
Retrieval over the corpus, structured comparison against the disclosure, a confidence-rated verdict, **every assertion clickable to the source passage**, and explicit flagging of Indian statutory exclusions (s.3(k) software, s.3(d) known-substance) which are the two most common ways Indian applications die.
*Why:* this is the differentiation. Nothing else here is hard to copy.

**D. Human verification layer**
Every assessment reviewed by a registered patent agent before release, with the reviewer named and their edits visible to the client.
*Why:* liability, credibility, and — critically — it generates the "% of AI output edited by human" metric that tells us whether the AI is actually working (§20).

**E. Patent Lifetime Cost Model**
Free, ungated. India + US + PCT. All-in twenty-year cost including the annuity escalation curve, with an explicit "here is when most people should abandon this" line on the chart.
*Why:* Phase 1 found nobody does this. It is cheap to build, impossible to argue with, and it is the clearest possible demonstration of §3.3.

**F. Agent matching and fixed-price engagement**
Verified agents with visible technical background, jurisdiction, and (once we have it) outcome data. Fixed prices published before engagement.

**G. The deadline & docket engine**
The operational backbone. Every date, every jurisdiction, every rule, with redundant alerting and a human check on critical dates.
*Why:* everything hangs off this, and a single missed deadline is an extinction-level brand event (§19.2).

**H. Client dashboard**
One screen: where every matter is, what happens next, what it costs, what we need from you. Nothing else.

**I. Secure document vault**
Encrypted, access-controlled, audit-logged.

**J. The agent workspace (minimum viable)**
Matter list, docket view, disclosure package, drafting assistance, e-filing handoff.
*Why:* without this we cannot recruit ICP-2, and without ICP-2 we have no capacity.

### 13.3 What must NOT exist in the MVP

I want to be forceful here, because over-building is the most likely way this fails.

| Excluded | Why |
|---|---|
| **Fully automated patent drafting** | Highest liability, hardest to validate, and we cannot know if the output was good for 3–5 years. Ship *assisted drafting for agents* instead. |
| **Patent analytics, landscaping, competitive intelligence** | We lose to PatSnap on data. Don't fight there. |
| **Trademarks, copyright, designs** | This is precisely the eevatech mistake Phase 1 identified. Adding them signals that patents are a side business. Patents only, until patents are won. |
| **Enterprise features** (SSO, on-prem, custom workflows, SLAs) | Tier 3 doesn't exist for 24 months. |
| **A licensing / monetization marketplace** | Zero liquidity. It will look empty and damage credibility. |
| **Native mobile apps** | Responsive web is sufficient. Alerts go via email and WhatsApp. |
| **Jurisdictions beyond IN + PCT** | Rules complexity explodes; do it after the engine is proven. |
| **Chemical structure / biosequence search** | Specialist, expensive, serves a segment we're not targeting. |
| **A community forum** | Moderation cost, liability from bad peer advice, embarrassing when empty. |
| **Multilingual UI at launch** | Multilingual *content* yes (SEO + Suresh). Multilingual product UI adds QA burden before we've validated the product. |
| **Any AI feature without source-linking** | Violates §3.1. No exceptions, including for demos. |

### 13.4 MVP success criteria

The MVP has succeeded if, within six months of launch:

- **≥100** verified invention disclosures captured
- **≥25%** of completed assessments convert to a paid engagement
- **≥15** active registered agents on the platform, with **≥60%** saying they would be upset if it were taken away
- **<20%** of AI assessments require *material* correction by the human reviewer
- **Zero** missed deadlines
- **≥20,000** monthly users on the free search layer

If the conversion number lands below 15%, the thesis is wrong and we should re-examine whether the assessment layer is really the wedge before building further.

---

## 14. Product roadmap

### MVP — Months 0–9 · *"Prove the assessment converts"*
Free Indian search & status · disclosure capture · AI assessment with provenance · human verification · lifetime cost model · agent matching · docket engine · client dashboard · document vault · minimum agent workspace.
**Jurisdictions:** IN + PCT
**Business model:** fixed-fee transactions only
**Success:** the criteria in §13.4

### V2 — Months 9–24 · *"Build the recurring layer and open the corridor"*

- **Renewals & annuity engine** (R2) — the highest-margin revenue in the business, and the reason to start it early
- **Portfolio subscription** (R3) — monitoring, competitor alerts, abandon/renew recommendations with reasoning
- **United States** — jurisdiction #2, plus the beginning of the outbound corridor
- **Agent SaaS proper** — full docketing, AI drafting assistance, client portal white-labelling. Still free; this is capacity investment.
- **University / TTO module** — disclosure intake, inventorship and ownership workflow, publication-vs-filing conflict detection, funding-agency compliance
- **First outcome dataset published** — the beginning of the quality signal (§16)
- **SOC 2 Type 1** — the gate to Tier 2b and Tier 3
- **Indian-language content and support** (Hindi, Tamil, Telugu, Kannada, Marathi to start)

### V3 — Months 24–42 · *"Become the system of record"*

- **EPO and selected EP states**; then CN/JP/KR
- **Freedom-to-operate and infringement monitoring** — the IP8-adjacent capability, but connected to portfolios we already hold
- **Mid-market IP management** (ICP-4 at scale) — multi-firm, multi-jurisdiction, invoice reconciliation, budget forecasting
- **Public API** — the Dennemeyer/PatSnap move; makes us infrastructure
- **Enterprise readiness** — SSO, audit, data residency, ISO 27001, SOC 2 Type 2
- **Outbound corridor at scale** — a named US-registered practitioner, US entity, and direct sales to ICP-6

### Long-term — Years 4–10 · *"From record to market"*

- **Monetization marketplace** — licensing, sale, cross-licensing, backed by the portfolios already in custody. This is the only path to marketplace liquidity that actually works: *own the supply first, then build the market.* Innoget and NineSigma failed at liquidity precisely because they tried to build the market without owning the supply.
- **Predictive prosecution intelligence** — examiner-level, art-unit-level, claim-language-level prediction of outcomes, built on our accumulated outcome data
- **Adjacent intangibles** — designs, trade secrets, software provenance, dataset rights, AI model provenance. This is where the market is going and where the "system of record for what you created" thesis extends naturally.
- **Infrastructure position** — other IP companies build on our data and rules engine

---

## 15. Feature prioritization (MoSCoW)

### Must Have — the MVP is not shippable without these

| Feature | Why |
|---|---|
| Indian patent search + status + alerts (free) | The wedge, the SEO engine, the trust proof |
| Structured invention disclosure capture | Entry to the Record; the proprietary dataset |
| AI assessment with mandatory source-linking | The differentiation. Everything else is copyable. |
| Named human verification of every assessment | Liability, credibility, and the AI quality metric |
| Deadline & docket engine with redundant alerting | The operational backbone; existential risk if wrong |
| Lifetime cost model (free, ungated) | The honesty proof; cheapest trust we can buy |
| Agent matching with visible credentials + fixed pricing | Solves the lemons problem at the point of purchase |
| Secure, audited document vault | Table stakes; confidentiality is existential |
| Client dashboard (status · next action · cost) | Fixes the silence — the central emotional job |
| Agent workspace (minimum) | Without it, no supply; without supply, no business |
| Public trust page (security, AI policy, model disclosure, limits) | The IP8 playbook, at near-zero cost |

### Should Have — V2, high value, not launch-blocking

Renewals engine · portfolio subscription · abandon/renew recommendations · competitor & citation monitoring · US jurisdiction · AI drafting assistance for agents · university/TTO module · Indian-language content · WhatsApp status notifications · agent outcome scorecards · published outcome benchmarks · SOC 2 Type 1

### Could Have — V3, valuable, deferrable

Public API · FTO and infringement monitoring · multi-firm invoice reconciliation · budget forecasting · EP/CN/JP/KR · white-label agent portals · Slack/Teams integration · patent drawings service · translation service · examiner-level analytics

### Won't Have — explicit exclusions, revisit only with evidence

| Excluded | Condition for revisiting |
|---|---|
| Trademark / copyright / design services | Not until patents are demonstrably won. This is a focus decision. |
| Patent landscaping & competitive analytics | Only if we acquire a data position we don't currently have |
| Litigation support / expert witness | Different business, different liability |
| Fully autonomous drafting without human sign-off | Only with 3+ years of outcome data showing parity, and never without disclosure |
| Community forum / peer advice | Liability from bad advice outweighs value |
| Patent valuation as a paid service | Methodologically indefensible today; would violate §3.3 |
| Crypto / blockchain "proof of invention" | Timestamping is solved by the filing system; this is theatre |
| Enterprise on-prem deployment | Not before Year 3 |

---

## 16. Competitive moat

### 16.1 Honest assessment: most of what we build is copyable

Let me be blunt, because founding documents that claim seven moats have none. A well-funded competitor could replicate our UI in 6 months, our AI assessment in 9, and our agent network in 18. Design is not a moat. AI is not a moat — we're all calling similar models. Content is not a moat.

Here is what is actually defensible, ranked by durability.

### 16.2 The five real moats

**1. The outcome dataset — strongest, slowest, most defensible**

Every matter that flows through us generates: which claim language drew which objection, from which examiner, in which art unit; which agent achieved what allowance rate in what technology; how much claim scope survived prosecution; how long it took; what it cost.

After three years this is a dataset nobody else has, and it powers four things simultaneously — agent matching, outcome prediction, pricing, and quality guarantees. It cannot be bought and it cannot be accelerated with capital. **It is the answer to the lemons problem in §6.2, and therefore it is the company.**

*Critical ethical and legal constraint:* this moat is built on **outcome metadata**, not on client invention content. We must never train models on confidential disclosures, and we must say so as clearly as IP8 does. The metadata — objection patterns, timelines, examiner behaviour — is derived from *published* prosecution records and our own operational data, and is legitimately ours. Conflating the two would be both wrong and, once discovered, fatal to the brand. Phase 3 must architect the separation explicitly.

**2. The docket-of-record — highest switching cost**

Once a portfolio's deadlines live with us, leaving is genuinely dangerous — a botched migration can cost someone a patent. This is exactly why Anaqua survives with a mediocre web presence and nine acquired product names. Switching cost beats product quality in this category, which is uncomfortable and true.

**3. The verified agent network with performance history**

Two-sided, slow to build, and it gets better as it grows. A competitor can recruit agents; they cannot recruit *three years of that agent's measured outcomes*.

**4. Trust as an accumulated asset**

Every time we tell someone not to file, every published benchmark, every honest limitation disclosed, every deadline never missed, deposits into an account a competitor cannot draw on. It takes years to build and one incident to destroy — which makes it simultaneously our most valuable and most fragile asset.

**5. Institutional embedding**

Once a university's disclosure workflow, ownership rules and compliance reporting run through us, we are inside their process. Universities change vendors roughly never.

### 16.3 What we should stop pretending is a moat

- **Design quality** — copyable in months. It's a wedge, not a moat.
- **AI capability** — we use the same frontier models everyone else does. Our differentiation is *how we constrain and verify them*, which is a product decision others can copy.
- **Price** — the fastest way to lose.
- **Content and SEO** — genuinely valuable for acquisition; not defensible.
- **"Full-stack integration"** — Dennemeyer and Questel already claim this. Claims aren't moats.

### 16.4 The moat strategy in one line

> **Use design and honesty to acquire. Use the docket to retain. Use outcome data to become uncopyable.**

Each moat has a different time constant — design works in month one, the docket in year one, outcome data in year three. We need all three running in parallel, and we need to resist the temptation to declare victory when the first one works.

---

## 17. Network effects

### 17.1 The uncomfortable truth first

**Patent filing is a low-frequency purchase.** An individual inventor may file once in a decade. That is genuinely bad for network effects, bad for retention, and bad for word-of-mouth velocity. Anyone who tells you this business has strong consumer network effects hasn't looked at the frequency data.

The honest response is threefold:
1. **Convert the transaction into a subscription** — the portfolio and renewals layer creates a twenty-year relationship out of a one-time purchase. This is the whole point of §4's "Record" layer.
2. **Target repeat filers** — startups (2–6 filings), universities (20–40/year), corporates (10–50/year). Institutions have frequency that individuals don't.
3. **Use the free layer to create high-frequency engagement without transactions** — an inventor might file once a decade but check on competitors monthly.

### 17.2 The network effects that are real

**1. Two-sided marketplace (inventors ↔ agents) — moderate strength**
More inventors → more work → more agents join → shorter turnaround and better specialization → more inventors. Real but not explosive, and it has a genuine cold-start problem (§17.3).

**2. Data network effect (outcome data) — strong and compounding**
More matters → more outcome data → better matching, better prediction, better drafting guidance → better outcomes → stronger reputation → more matters. **This is the most powerful loop in the business** because it strengthens with volume and cannot be bought.

**3. Examiner and art-unit intelligence — strong, and underrated**
The more applications we prosecute in a given art unit, the better we understand that examiner's tendencies, preferred claim structures and objection patterns. This is real, compounding, jurisdiction-specific knowledge, and it's the kind of edge that experienced firms have informally and nobody has systematized.

**4. Institutional cluster effects — moderate**
One university adopting converts faculty, students and spinouts. Academic networks talk to each other. TTO communities are small and reference-driven.

**5. Licensing marketplace — potentially the strongest, and the least likely**
More patents in custody → more attractive to licensees → more transactions → more owners join. Classic marketplace dynamics with high take-rates. But marketplace liquidity in IP has defeated everyone who's tried it (Phase 1 §3.6), and the reason is always the same: they tried to build the market without owning the supply.

**Our only advantage is sequencing.** We would arrive at the marketplace with thousands of portfolios already in custody, already structured, already assessed. That is a fundamentally different starting position from Innoget's. It still might not work — but it's the only version worth attempting, and it must come in Year 4+, not earlier.

### 17.3 Solving the cold start

The two-sided problem is: agents won't join without matters, and clients won't come without agents.

**Break it on the supply side first**, and break it with tooling rather than volume:

1. **Give agents the free tooling before we give them a single client.** Docketing, deadline automation, client portals. This has standalone value — Priya (ICP-2) will adopt it purely to stop worrying about her Excel sheet. We acquire supply by solving their operational pain, not by promising demand we don't have.
2. **Seed demand with the free search layer**, which requires no agents at all and builds an audience of exactly the right people.
3. **Deliver the first 50 matters ourselves** — via one or two contracted agents at above-market rates. Manufacture quality for the first cohort. Do things that don't scale.
4. **Then open the network** with real demand to show.

---

## 18. The flywheel

### 18.1 The core loop

```
                    ┌────────────────────────────┐
                    │  FREE LAYER                │
                    │  Indian search · status ·  │
                    │  alerts · cost model ·     │
                    │  education                 │
                    └──────────────┬─────────────┘
                                   │ organic traffic, zero CAC
                                   ▼
                    ┌────────────────────────────┐
                    │  DISCLOSURE CAPTURE        │
                    │  Structured · timestamped  │
                    └──────────────┬─────────────┘
                                   ▼
                    ┌────────────────────────────┐
                    │  AI ASSESSMENT             │
                    │  Source-linked · honest    │
                    │  (including "don't file")  │
                    └──────────────┬─────────────┘
                                   │ ~25% convert
                                   ▼
                    ┌────────────────────────────┐
                    │  PAID FILING               │
                    │  Verified agent · fixed fee│
                    └──────────────┬─────────────┘
                                   ▼
                    ┌────────────────────────────┐
                    │  THE RECORD                │
                    │  Docket · renewals ·       │
                    │  monitoring · 20 years     │
                    └──────────────┬─────────────┘
                                   │
                    ┌──────────────┴─────────────┐
                    │  OUTCOME DATA              │
                    │  Objections · allowance ·  │
                    │  timelines · by agent,     │
                    │  examiner, art unit        │
                    └──────────────┬─────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
┌───────────────┐        ┌──────────────────┐      ┌──────────────────┐
│ BETTER        │        │ BETTER AI        │      │ PUBLISHED        │
│ MATCHING      │        │ (grounded in     │      │ BENCHMARKS       │
│ (right agent, │        │ real prosecution │      │ (the quality     │
│ right art     │        │ outcomes)        │      │ signal — §6.2)   │
│ unit)         │        │                  │      │                  │
└───────┬───────┘        └────────┬─────────┘      └────────┬─────────┘
        │                         │                          │
        └─────────────────────────┴──────────────────────────┘
                                   │
                                   ▼
                    ┌────────────────────────────┐
                    │  BETTER OUTCOMES           │
                    │  → reputation → referrals  │
                    │  → more free-layer traffic │
                    └──────────────┬─────────────┘
                                   │
                                   └──── back to the top, wider each turn
```

### 18.2 The supply-side loop, running in parallel

```
Free agent tooling  →  agents join for the tooling alone
        ↓
More agent capacity  →  faster turnaround, lower prices, deeper specialization
        ↓
Better client experience  →  more inventors
        ↓
More matters  →  more income per agent
        ↓
Agents recruit other agents  →  back to the top
```

### 18.3 What makes each turn wider

Four accelerants, and it's worth being precise about which is which:

| Accelerant | Effect |
|---|---|
| **Content and original research** | Free-layer traffic grows without paid spend |
| **Published outcome benchmarks** | Conversion rate rises because the quality signal gets stronger |
| **AI improvement from outcome data** | Agent hours per matter fall; margin rises; price can fall |
| **Renewals accumulating** | Recurring base grows; the company becomes less dependent on new transactions each year |

### 18.4 Where the flywheel breaks — the three failure modes

Naming them because a flywheel diagram that doesn't name its failure modes is decoration.

1. **Conversion is too low.** If disclosure → filing runs below ~15%, the free layer is an expensive charity. *Detect early* via §20 and fix the assessment layer before scaling acquisition.
2. **Agent capacity doesn't materialize.** If ICP-2 doesn't adopt, the flywheel stalls at "paid filing" regardless of demand. *This is the highest-probability failure mode* and it's why the agent product cannot be deprioritized.
3. **A quality incident.** One missed deadline that costs a client a patent, or one hallucinated prior-art reference that leads to a bad filing decision, and the trust asset — the thing the whole flywheel spins on — is gone. *This is the highest-severity failure mode.* See §19.

---

## 19. Risks

### 19.1 Business risks

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| **Low purchase frequency kills retention** | High | High | The Record + renewals convert one-time buyers into 20-year subscribers. This is the entire strategic answer. |
| **Agent capacity doesn't materialize** | Critical | Medium-High | Supply-first cold start (§17.3); free tooling with standalone value; consider acquiring a small practice |
| **Indian willingness-to-pay is too low** | High | Medium | The outbound corridor (§12). Do not try to fix this with Indian price increases. |
| **Incumbent builds a consumer front end** | High | Medium | 24–36 month window; the outcome-data moat must be underway before it closes |
| **Services drag destroys software margins** | Medium | High | Ruthless measurement of agent-hours-per-matter; automate or decline the long tail |
| **Founder-market fit gap** | High | Medium | If no founder is a registered patent agent, hire one as an early leader, not an advisor. This is not delegable. |

### 19.2 Legal & regulatory risks

| Risk | Severity | Mitigation |
|---|---|---|
| **A missed deadline costs a client a patent** | **Existential** | Redundant automated alerting + mandatory human confirmation on all critical dates + professional indemnity insurance from day one + a documented escalation protocol. **Treat this as the single most important operational control in the company.** |
| **Unauthorized practice of law** | Critical | Structure per §11; TechCo never advises; all regulated work signed by registered practitioners; jurisdiction-specific counsel before entering any market |
| **Fee-sharing / referral rule violation** | High | Resolve §11.3 Q1 with specialist counsel **before** setting pricing architecture |
| **Professional negligence claim on drafting** | High | Named accountable practitioner; PI insurance; documented review process; no autonomous drafting |
| **Advertising rules constrain the brand** | Medium | Marketing sits in TechCo; regulated entities don't market |
| **Privilege assumed but absent** | High | Prominent, plain-language disclosure at onboarding, not buried in terms |

### 19.3 Technical risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Deadline engine computes a date wrongly** | **Existential** | Rules-as-data with versioning and audit trail; automated test suite per jurisdiction; independent human verification of critical dates; never a hard-coded rule |
| **IP India data unreliability / downtime** | High | Local mirroring, change-detection polling, graceful degradation, transparent status page |
| **Data coverage gaps misread as completeness** | High | Explicit, visible coverage disclosure in the product per §3.3 |
| **Security breach of pre-filing disclosures** | **Existential** | Encryption at rest and in transit, strict access control, full audit logging, penetration testing, SOC 2 on the V2 timeline |
| **Building India-only, then needing multi-jurisdiction** | High | Jurisdiction-agnostic data model from day one (§12.4). Non-negotiable. |

### 19.4 AI-specific risks

| Risk | Severity | Mitigation |
|---|---|---|
| **False negative in novelty search** — we say it's novel, it isn't | **Critical** | Worse than a false positive: the client files, spends, and loses. Multiple retrieval strategies, explicit confidence scoring, mandatory human review, and honest communication that no search is exhaustive |
| **Hallucinated prior-art citations** | Critical | Source-linking is the structural fix — if it can't be linked to a retrievable document, it cannot be displayed. Enforce at the architecture level, not the prompt level. |
| **Poor claim drafting that narrows scope invisibly** | Critical | No autonomous drafting. Agent-assisted only. Track claim-scope retention as a quality metric (§20). |
| **Disclosure content used for model training** | **Existential** | Contractual no-training guarantees with model providers; private/enterprise deployments; explicit public pledge (the IP8 pattern); architecture that separates content from metadata (§16.2) |
| **Confidentiality breach via model provider** | Existential | Enterprise-tier deployments only; documented data flow; publish the model providers by name |
| **Model provider dependency / price shock** | Medium | Multi-provider architecture from day one; abstraction layer; retrieval and rules logic owned in-house |
| **Over-claiming AI capability in marketing** | High | Violates §3.3, invites regulatory attention, and destroys the trust moat. Publish benchmarks instead of adjectives. |

### 19.5 Financial risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Long cash conversion cycle** | High | Milestone billing; advance on filing; renewals prepaid |
| **CAC exceeds LTV in a low-frequency category** | High | Free layer + content, not paid search. If CAC requires paid acquisition to work, the model is wrong. |
| **Compliance costs arrive before enterprise revenue** | Medium | Sequence SOC 2 to V2 when Tier 2b revenue is visible, not before |
| **Under-pricing to win, then unable to raise** | High | Publish prices confidently from launch; never anchor on "affordable" |
| **Funding a services business on software multiples** | Medium | Be honest with investors about the mix; the story is "services today, software economics by Year 3," and the metrics must show that trajectory |

---

## 20. Success metrics

> **Definition notice (Decision I).**
> Canonical metric definitions — formula, numerator, denominator, purpose and target — are maintained at `01_Strategy/Metrics.md`. This section remains the origin of those definitions and is unaltered.
> Three points affect how this section and §13.4 should be read:
> 1. **§13.4's conversion metric** ("≥25% of *completed assessments* convert to a paid engagement") was clarified by ADR §12 to mean **released assessment → paid filing engagement**. "Released" is reached only after a `ReviewDecision` by a Verified Agent (BR-01), and the assessment is free and precedes payment (ADR §7).
> 2. **§20.1, §20.2 and §20.3 reference a different, disclosure-denominated metric.** §20.2 states its target (>25%); §20.1 and §20.3 name it without a numeric target. Its failure threshold (~15%) is stated in **§18.4**, not within §20. This disclosure-denominated metric and §13.4's assessment-denominated metric are **two separate metrics** (Metrics OP-1 and OP-2 respectively). They cannot both hold at 25% unless every Disclosure produces a released Assessment. ADR §12 addressed only the assessment-denominated one. **The conflict is recorded, not resolved** — see Metrics §4.1.
> 3. **§10.3's unit economics omit the assessment-review cost.** ADR §8 records that reviewers are compensated by the platform and that assessment review is a platform-borne COGS line, independent of whether the client ever pays for a filing.

### 20.1 North Star

**Years 1–3: Disclosures Converted to Filings.**

The single number that captures whether we are fixing the funnel. It requires acquisition (someone found us), trust (they disclosed), quality (the assessment was credible), and conversion (they paid). One number, whole funnel.

**Years 4+: Assets Under Custody** — the count of live IP assets whose record, deadlines and renewals run on our platform. This is the number that determines enterprise value, because it's the recurring base and the marketplace supply.

*Deliberately not the North Star:* revenue (lags and hides mix problems), users (vanity in a low-frequency category), or patents granted (3–5 year lag makes it useless for steering).

### 20.2 Metrics by layer

**Acquisition**
- Free-layer MAU · organic sessions · branded search volume (the truest brand-strength proxy) · referral share of new customers · CAC by channel

**Activation**
- Disclosure start → completion rate *(target >60%; if lower, the form is too hard)*
- Assessment completion rate · time to first assessment

**Conversion**
- **Disclosure → filing conversion** *(target >25%)*
- Quote → engagement rate · time from disclosure to filing

**Quality — leading indicators, since grant is 3–5 years out**
- **% of AI output materially edited by human reviewer** *(target: falling toward <15%)* — the single best measure of whether the AI is actually working
- Objections per first examination report vs. market baseline
- s.3(k) / s.3(d) rejection rate vs. baseline *(our specific Indian differentiator)*
- **Claim scope retention** — independent claim breadth at grant vs. as filed
- First-action allowance rate · time to grant
- **Citation-click rate on AI outputs** — are users checking our sources? A rising rate means engaged trust; near-zero means they either trust blindly (dangerous) or have disengaged.

**Retention & custody**
- Renewal retention rate *(target >95% — this should be near-perfect)*
- Portfolio subscription net revenue retention · assets under custody · cohort survival at 12/24/60 months

**Supply side — weight these as heavily as demand-side metrics**
- Active agents · matters per agent per month · agent utilization
- **Agent-hours per matter** *(target: −40% within 18 months)* — this is the core AI thesis, quantified
- Agent NPS · agent churn · turnaround time

**Financial**
- Gross margin **by service line** (not blended — blended margin hides the services drag)
- Recurring revenue as % of total *(target: >40% by Year 3)*
- LTV:CAC *(target >3:1)* · CAC payback
- Revenue per matter, and revenue mix by jurisdiction (the corridor indicator)

**Trust — measure it, don't assume it**
- **Missed deadlines: target zero. Any non-zero value is a company-level incident.**
- "Don't file" recommendation rate *(if this ever approaches zero, we've stopped being honest)*
- Complaint rate · security incidents · time to disclose an error

### 20.3 The four numbers on the wall

If we tracked only four:

1. **Disclosure → filing conversion** — is the thesis working?
2. **Agent-hours per matter** — is the AI actually creating leverage?
3. **Recurring revenue %** — are we becoming a compounding business or a services shop?
4. **Missed deadlines** — are we still trustworthy?

---

## 21. Strategic recommendations — where I disagree with the brief

You asked me to challenge assumptions rather than agree. Seven, in order of how much they'd change the plan.

### 21.1 "India is the market" is wrong — and it's the most expensive assumption in the brief

The entire Indian patent prosecution services market is plausibly **$90–170M**. A dominant share of it is a $30–50M revenue business. That is a genuinely good outcome and it is not the company you described wanting to build.

**India is the beachhead, the factory and the proving ground. The market is global.** This isn't a Year 5 expansion note — it changes decisions in Month 1: a jurisdiction-agnostic data model, currency-agnostic pricing, English-first product with Indian-language layers, and an outbound-corridor motion started in Year 2 rather than Year 4.

### 21.2 "The Apple of Patent Services" is the wrong North Star

Covered at length in §5.1. Short version: Apple's premium is funded by hardware margin and driven by desire. We have services margins and nobody desires a patent. **Model Stripe and Wise instead** — competence and radical honesty in an opaque category. Same design ambition, correct emotional register, and it doesn't lead you to over-invest in aesthetics at the expense of the operational backbone that actually wins here.

### 21.3 Ten audiences at launch will produce the failure you're trying to avoid

Your brief lists ten target audiences. Phase 1 documented exactly what happens: Questel with twenty product names, Anaqua with nine, both requiring a demo call before anyone understands what they sell.

**Start with two: deep-tech startups and registered patent agents.** Everything else waits. And note that the agent — listed ninth in your brief — is arguably the more important of the two, because they are the capacity constraint.

### 21.4 AI patent drafting should not be a launch feature

It's the most attractive feature in the brief and the most dangerous. Claim drafting is where patent value is created or destroyed; current models produce plausible-but-subtly-flawed claims; and **we cannot know whether our output was good for three to five years.** Shipping autonomous drafting into that feedback vacuum is how you accumulate a portfolio of negligence claims before you have the data to know you have a problem.

**Ship AI drafting as an agent tool in V2, where a licensed human edits and signs, and track claim-scope retention obsessively.** Autonomous drafting only after multi-year outcome data shows parity — and even then, with disclosure.

### 21.5 Patent analytics and portfolio landscaping are traps

Your brief lists "patent analytics" as a core pillar. This is PatSnap's home ground, defended by 2 billion structured data points and a decade of investment (Phase 1 §3.3). We cannot win there and every rupee spent trying is a rupee not spent on the front of the funnel where nobody is competing.

**Analytics belongs in V3 and only as a portfolio feature for assets we already hold** — where our data advantage is real because it's *our* data.

### 21.6 The regulatory question is not a legal detail — it's the first product decision

It determines your primary CTA, your pricing architecture, your marketing entity, your liability exposure and your gross margin. It is currently absent from your brief entirely.

**Resolve §11.3 Question 1 — fee-sharing structure — with specialist counsel before Phase 3 begins.** Phase 3's product architecture will be materially different depending on whether we charge the client a technology fee, take a share of the agent's fee, or licence software to the agent. Getting this wrong means rebuilding the billing and matching systems.

### 21.7 The thing your brief doesn't mention that matters most

There is no mention of **operational reliability** anywhere in the brief — no docketing, no deadline management, no error protocol.

**This is the actual business.** Every enterprise incumbent in Phase 1 — Anaqua, Questel, Dennemeyer, MaxVal — is fundamentally a deadline-management company with software wrapped around it. Anaqua survives with a mediocre website and nine acquired product names because their docket is correct and moving off it is dangerous.

A beautiful platform that misses one national-phase deadline is worth less than an ugly one that never does. **Build the deadline engine first, treat missed deadlines as a company-level emergency, and buy professional indemnity insurance before you take your first client.**

### 21.8 One thing in the brief I think is exactly right

The instinct that this should be an *ecosystem* rather than a filing service is correct, and it's the reason the opportunity exists. Every competitor owns one to three stages of a nine-stage lifecycle, and the handoffs between them are email attachments. The integration genuinely is the product.

The correction is only about **sequence**: build the ecosystem one layer at a time, in the order that compounds, rather than attempting the full picture at launch. Record first, Judgement second, Work third, Market last.

---

## 22. Executive summary

> **[Platform] is the operating layer between an invention and the patent system: the record of what you invented, the honest judgement of whether it's worth protecting, and the verified professional work to protect it — for twenty years, with every AI conclusion traceable to its source.**

**The opportunity.** Patent services are a lemons market: buyers cannot evaluate quality at purchase, or for years afterwards. The result is competition on price and trust theatre — logo walls and unverifiable success rates — while good practitioners get undercut. Markets with this structure are won by whoever first makes quality *visible*. Nobody has. Simultaneously, AI has made expert analysis cheap, but every incumbent has pointed it at organizations that already have IP departments, leaving the front of the funnel — where inventions are lost — completely unserved. That window is open for roughly 24–36 months.

**The strategy.** Win the front of the funnel with a free Indian patent search and status layer that fixes the country's most broken piece of public IP infrastructure. Convert that audience with an AI assessment that is source-linked, human-verified, and honest enough to say "don't file." Monetize through fixed-fee professional work delivered by a recruited network of registered agents. Retain for twenty years through the docket, renewals and portfolio custody. Compound through outcome data that no competitor can buy.

**The structure.** A technology company that markets, builds and holds the data, working with a network of independent registered patent agents who perform and sign all regulated work — with a captive practice added in Year 2–3 as a quality anchor. TechCo never gives legal advice, and says so prominently.

**The geography.** India-first for product, users, supply and cost base. But India is the beachhead, not the market — the entire Indian patent services market is plausibly $90–170M. Venture scale requires the outbound corridor (international filings and international clients served from an Indian cost base) starting Year 2, and a product architected as jurisdiction-agnostic from the first line of code.

**The MVP.** Free search and status · structured disclosure capture · source-linked AI assessment · named human verification · lifetime cost model · agent matching with fixed pricing · the deadline engine · one client dashboard · the agent workspace. **Nothing else.** Explicitly excluded: autonomous drafting, analytics, trademarks, enterprise features, marketplace, mobile apps.

**The moat.** Design and honesty acquire. The docket retains. Outcome data — objection patterns, allowance rates, claim-scope retention by agent, examiner and art unit — makes us uncopyable by year three, because it cannot be bought or accelerated with capital. Built strictly on outcome metadata, never on client invention content.

**The flywheel.** Free layer → disclosure → assessment → filing → the Record → outcome data → better matching, better AI, published benchmarks → better outcomes → reputation → more free-layer traffic. Running in parallel: free agent tooling → capacity → speed and price → more inventors → more agent income → agent referrals.

**The four numbers.** Disclosure→filing conversion (is the thesis working?) · agent-hours per matter (is the AI creating leverage?) · recurring revenue share (are we compounding or just servicing?) · missed deadlines (are we still trustworthy — target zero, always).

**The biggest risks.** A missed deadline destroying trust irrecoverably. Agent capacity failing to materialize, which caps everything. A false-negative novelty result that costs a client their patent. All three are operational, not strategic — which is the point of §21.7: **this is a reliability business wearing an AI costume, and the companies that forget that lose to the ones that don't.**

**Where I disagree with the brief.** India is not the market. "Apple" is the wrong model — Stripe and Wise are right. Ten audiences at launch is a documented failure pattern. AI drafting should not launch. Analytics is PatSnap's ground and unwinnable. The regulatory structure is the first product decision, not a legal footnote. And the deadline engine — absent from the brief entirely — is the actual business.

---

## Ready for Phase 3

Phase 3 (Product Architecture) can be built directly from this document. Two things I need from you first, because they change Phase 3 materially:

1. **The fee-sharing / regulatory structure answer** (§11.3 Q1) — determines the billing model, matching model and the primary CTA
2. **Whether you accept the India-as-beachhead-not-market framing** (§12.3, §21.1) — determines whether Phase 3 designs a jurisdiction-agnostic architecture from day one or an India-native one

If you'd rather I proceed on my recommended assumptions and flag the dependencies inline, say so and I'll do that.

---

*End of Phase 2.*
