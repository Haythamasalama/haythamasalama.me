# Pull requests

**Read when:** naming a branch, opening a PR, writing or updating its description, answering review
comments, or merging.
**Owns:** branch names, PR titles and bodies, linking issues, draft vs ready, review replies, updating a
PR, merge methods and the merge message.
**See also:** the commit format in [../SKILL.md](../SKILL.md); the spec in [spec.md](spec.md).

Open, push or merge only when the owner asks. Checked against GitHub's behaviour on 2026-11-03; other
hosts (GitLab merge requests, Bitbucket) work the same way with different button names.

## TL;DR

- Branch `<type>/<short-description>`, lowercase kebab-case, from an up-to-date main branch.
- Title = a Conventional Commits subject. It becomes the squash commit, so it carries the type, the scope
  and a real description.
- Body: what and why, how it was checked, what is left out, breaking changes, `Closes #N`.
- One reason per PR. Small enough to review in one sitting.
- Fill the repo's PR template when there is one.
- Answer every review thread: fix and say what changed, or say why not. Resolve only what you fixed.
- After review, add commits; force-push only your own branch that nobody else has checked out.
- Merge with the method the repo uses; with squash, rewrite the message before you click.

## Before opening

```bash
git fetch origin
git log --oneline origin/main..HEAD     # exactly the commits you mean to send
git diff --stat origin/main...HEAD      # no stray files
```

- Run the repo's own checks (lint, type check, tests, build). CI should confirm, not discover.
- Look for a template: `.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE.md`,
  `.github/PULL_REQUEST_TEMPLATE/*.md`, `PULL_REQUEST_TEMPLATE.md` or `docs/PULL_REQUEST_TEMPLATE.md`.
- Read the last few merged PRs: title style, body headings, whether they squash.

## Branch names

```
feat/invoice-export
fix/cart-total-rounding
docs/api-pagination
```

Type first, then a few words. Some repos add the scope or a ticket id (`fix/billing-412-rounding`);
follow them. A tool-assigned branch name is fine as it is.

## Title

Same rules as a commit subject ([format](../SKILL.md#description)): `type(scope): description`,
imperative, lowercase start, no trailing period, under ~72 characters.

```
feat(export): add CSV export for invoices
fix(cart): round totals once, after discounts
docs: explain pagination cursors
```

Not `Update README`, `WIP`, `Fixes`, or the branch name. The type follows the most important change: a
feature that also fixes a bug on the way is `feat`, and the fix is mentioned in the body (or split out).
Put `!` in the title when the PR breaks something ([spec.md](spec.md#the-rules-short), rules 11 to 13).

## Body

Write it for a reviewer who has not seen the conversation, and for someone reading the history a year
later. Without a template:

```markdown
## Summary
What changes, in two to four bullets a reviewer can check against the diff.

## Why
The problem, the constraint, and the alternative you rejected.

## How it was checked
- Commands run and their result (lint, types, tests, build).
- Manual checks: the page, the flow, both themes, the phone width.

## Not in this PR
What you left out on purpose, and where it goes next.

## Breaking changes
Only when there are any: what breaks and what a user must do.

Closes #123
```

- Leave out sections that would say "none". A two-line change can have a two-line body.
- `Closes`, `Fixes` or `Resolves` followed by `#N` closes the issue when the PR merges into the default
  branch. `Refs #N` links without closing.
- No file-by-file list: the diff shows it. No session narration ("first I tried…").
- Screenshots for visual changes, before and after, with demo data only.
- Mark it **draft** while it is not ready for review; mark it ready when checks pass and the body is
  final.

## Size and scope

- One reason to change per PR, the same test as a commit: could it be reverted alone?
- A refactor and the feature on top of it can be two PRs, the refactor first.
- Unrelated fixes you noticed go in their own PR or a note, not this one.
- Generated files (lockfiles, snapshots) belong with the change that generated them.

## Review comments

On your own PR:

- Answer every thread. Either "Fixed in `<sha>`: <what changed>" or why it stays as it is. A reviewer
  should not have to diff to find out.
- Resolve a thread only after its fix is pushed. Leave the reviewer's open questions for them to resolve.
- Re-request review after pushing changes for a "changes requested" review.
- Treat bot findings as claims: reproduce or trace them before changing code.

When you review, label each comment so the author knows what blocks the merge
([Conventional Comments](https://conventionalcomments.org/) style):

```
issue: this drops the last page when the count is a multiple of 20.
suggestion (non-blocking): `match` would read better than the if-chain here.
question: is the 30s timeout from the provider's docs?
nit (non-blocking): trailing space.
praise: the retry test covers exactly the case that bit us last month.
```

## Updating a PR

- Push new commits for review feedback. Force-pushing rewrites the history reviewers already read and
  breaks the checkout of anyone who pulled the branch: do it only on your own branch, and say so.
- To catch up with the main branch, merge it in, or rebase if the branch is yours alone and the repo
  rebases.
- If the scope changed, update the title and body. They are the record, not the first draft.
- If the PR is already merged, follow-up work is a new PR from the latest main branch, never more
  commits on the merged branch.

## Merging

| Method | What lands on the main branch | What you must get right |
|---|---|---|
| Squash | one commit: the PR title (GitHub appends ` (#N)`) and the body you write in the merge box | the title and the body |
| Merge commit | every commit plus `Merge pull request #N from …` | every commit on the branch |
| Rebase | every commit, replayed | every commit on the branch |

Use the method the repo uses; the log shows it (`(#N)` at the end of subjects means squash).

With squash, GitHub fills the merge body with the list of the branch's commit subjects. Replace it:

```
fix(cart): round totals once, after discounts (#57)

Each line rounded its own discount, so a 3-item cart could be a cent off
the invoice. Totals now round once, at the end, the way the invoice does.

Closes #51
Co-authored-by: Name <address>
```

- Keep the attribution footers (`Co-authored-by`, `Signed-off-by`) the branch carried; drop the rest.
- Merge only when checks are green on the latest commit and required reviews are in.
- Delete the branch after merging unless the repo keeps them.
