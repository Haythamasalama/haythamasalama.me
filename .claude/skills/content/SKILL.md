---
name: content
description: The writing rules for every word on haythamasalama.me and its LinkedIn, Medium and X drafts. Covers voice, structure, honesty, attribution, numbers, and what is safe to publish about employers and clients. Use whenever you write or edit visible text: project cards and pages, articles, the About page, tool descriptions, captions and alt text.
---

# Content

Readers include CEOs, CTOs, engineers and HR. Project pages show the owner's goal, role, contribution and results, in language all of them follow. Technical depth (how something is built, step by step) belongs in articles, not project pages.

## Voice

- Use plain words over jargon. Show the work before the title. Be warm, never loud (from the brand page).
- Write in first person for the owner's own work ("I designed…"). Say "the team" for shared work.
- Use short sentences, and give each paragraph one idea.
- Don't use marketing words: no "cutting-edge", "seamless", "robust", "blazing", "revolutionary", "world-class", "leverage", "empower", "unlock". If a sentence still works without the adjective, drop the adjective.
- Avoid AI-sounding filler: no "In today's fast-paced world", no "It's worth noting", no tricolons for rhythm. The `humanizer` skill can check a draft.
- Spelling: write new text in British English (colour, behaviour, organisation, authorise). Existing pages mix spellings; don't churn them.
- Headings are sentence case and say plainly what the section is ("The integration engine", not "One engine to rule them all").
- Meta lines use a middle dot: `Founder · Aug 2026 – now`.

## Honesty and attribution

- **Every claim must be verifiable.** Before writing about a project, check the code and git history: `git shortlog -sne --all` for authorship, and `git log --author=<name> -- <path>` against the total commits for each module. If the code doesn't show something the owner claims, ask; don't drop it and don't invent it. Local repos can be partial copies of the real product.
- **Say exactly what the owner did.**
  - "I designed and built X."
  - "I built the foundation of X; the team grew it."
  - "The team writes the integrations; I built the engine they run on."
  - "Proposed X, led its extraction, and maintain it."

  Never claim a teammate's work.
- **The problem section is the owner's problem**, the one he faced and solved in his role, not the company's whole business.
- **No unmeasured outcomes.** "Reviews focus on design because formatting is checked first" is fine: it follows from the mechanism. "Onboarding is 3× faster" is not, unless it was measured.

## Employers and clients

WINCH, Sanad, Faris Petrol, Patric and every future employer or client.

- **No internal counts.** No files, pages, components, releases, endpoints, rule files or pull-request sizes.
- **Write growing counts as "more than N"** ("more than 50 domains"), because the real number will change.
- **No dated internal milestones** ("in February we added…"). Competitors read the site. Public facts, like job dates, are fine.
- **No long lists of vendors or internal tools.** Describe integrations by category: government services, payment gateways, AI models, messaging. Name a public platform only where it explains what the product does ("waybills through Bayan").
- **Don't name the AI tooling vendor.** Say "AI coding agents", not the product name.
- **Don't name frameworks in project copy** (Laravel, Vue, Inertia). Describe the design instead.
- **Colleagues:** say "the team" on the site. Name them only in LinkedIn drafts, as contributors.
- **Keep claims modest,** so former teams aren't upset.
- **Never publish:** secrets, hostnames, endpoint paths, database schemas, permission keys, rate-limit numbers, crypto parameters, known weaknesses, pricing, or customer and personal data.
- **Screenshots:** none of employer or client products unless the owner asks; the figures explain the work. Use demo data for the owner's own products.

The owner's own products (Runarks) can go deeper, but security still stays at the level of principles: no bypass details, no edge or firewall setup.

## Lengths

| Text | Length |
|---|---|
| Project card description | one sentence, about 80 to 160 characters |
| Page `description` (SEO, link previews) | 150 to 220 characters |
| Feature grid item | a title of 2 to 5 words, then one sentence |
| Figure caption | one sentence that says what to notice |
| Figure `alt` | the whole figure in words: boxes, arrows, outcome |
| LinkedIn project description | under 2,000 characters |
