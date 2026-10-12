---
name: articles
description: How to write and publish a blog post on haythamasalama.me and turn it into Medium, X and LinkedIn posts. Covers file location and front matter, the Markdown components and code blocks, the structure of a technical deep dive or a project story, reusing project figures, and the social drafts. Use when the owner asks for an article, a post, a deep dive or a thread.
---

# Articles

Articles are where the technical depth goes: how a system was designed, why, and what it cost. Project pages stay on role and impact and link here for the details (see `projects`). Load `content` for the writing rules and `figures` for diagrams.

## Files

- **The post:** `content/articles/<category-folder>/<slug>.md`, served at `/articles/<category-folder>/<slug>`. Existing folders are `front-end`, `laravel` and `software-engineering`; add a folder for a new category.
- **Social drafts:** `claudedocs/articles/<slug>/`. Local only, never committed.

```yaml
---
title: 'How the notification system sends one event to every channel'
description: 'One call per event, templates per channel and language, and a guard against broken messages.'   # 120–200 characters
date: '2026-10-20'          # YYYY-MM-DD
category: 'Software engineering'
icon: 'lucide:bell'         # shown in lists
readingTime: '6 min read'   # about 230 words a minute
---
```

## Inside the post

- **Headings:** start at `##`. Each becomes a shareable anchor.
- **Code blocks:** fence them with a language and a file name, like ```` ```php [app/Actions/SendMessage.php] ````. Highlighting uses the brand themes.
- **Figures:** `::sketch-figure{name="<project>/<name>" alt="…"}` with a caption. Reuse the project's figures, or draw new ones (see `figures`).
- **Notes:** `::alert-info` for an aside, `::feature-grid` for a list of capabilities.
- **Images:** go in `public/articles/`, in WebP.

## Shapes that work

**A deep dive**, for example "How I designed the integration engine":
1. The situation and the constraint, in a short paragraph.
2. The design, figure first, then how the pieces fit.
3. The decisions and their trade-offs, including what was rejected.
4. What it changed, and what the next version would do differently.
5. A link to the project page.

**A project story**, the "one angle" post for a project:
1. A hook from the real problem.
2. The idea that solved it.
3. One or two figures.
4. The result.
5. A link to the project page.

Length: 800 to 1,500 words for a deep dive, 500 to 900 for a story.

The employer rules in `content` still apply: no internal counts, no dated milestones, no internals that help a competitor or an attacker. Show patterns with short re-typed snippets, never copied company code.

## Social drafts

Write them after the post, and keep each one honest about what it links to.

- **Medium:** import the published URL ("Import a story" keeps the canonical link to the site). Upload the figures as WebP from `claudedocs/projects/<slug>/`, or export new ones (see `figures`). Save notes in `claudedocs/articles/<slug>/medium.md`.
- **X thread** (`x-thread.md`): five to eight posts, with one figure on the first and one on the key post, and the link in the last post. No hashtag walls.
- **LinkedIn post** (`linkedin-post.md`): a three-line hook, five to eight short lines on the idea and the result, one figure, and the link. Name colleagues here if they shared the work.

## Before you finish

- `npm run lint && npm run build` pass, and the post appears in the build log and on `/articles`.
- Read the post at 375px and in both themes.
- `readingTime` matches the word count.
