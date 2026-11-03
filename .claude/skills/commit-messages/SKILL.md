---
name: commit-messages
description: Use when writing a commit message, staging or committing changes, splitting work into several commits, rewording a commit, or opening, titling, describing, updating or merging a pull request, in any repository. Covers the Conventional Commits 1.0.0 format rule by rule, choosing a type and scope, what belongs in the body, footers and breaking changes, the SemVer bump each type implies, how to split a diff into commits that revert cleanly, how to reword safely, PR titles and bodies that become the squash commit, linking issues, answering review comments, and the merge message. Triggers include "commit this", "write the commit message", "split this into commits", "reword the last commit", "open a PR", "write the PR description", "squash and merge", "reply to the review", «اعمل commit», «رسالة الكوميت», «قسّم الكوميتات», «افتح PR», «وصف الـ PR», «ادمج».
---

# Commit messages and pull requests

**Read when:** about to commit, reword, split work, open or update a pull request, answer a review, or
merge one.
**Owns:** the commit format, types, scopes, bodies, footers, breaking changes, splitting, rewording; PR
titles, bodies, review replies and merge messages.
**See also:** a stack skill may add its own scope list (for example layer scopes in a Laravel repo).

Conventional Commits ([v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/), checked 2026-11-03) for
any repository. Commit, push, open a PR or merge only when the user asks; many owners review and commit
themselves.

## Where each topic lives

| Topic | File |
|---|---|
| Format, types, scope, body, footers, splitting, rewording | this file |
| The 16 rules of the spec, SemVer mapping, reverts, edge cases | [references/spec.md](references/spec.md) |
| Branches, PR title and body, linking issues, review replies, updating, merging | [references/pull-requests.md](references/pull-requests.md) |

## TL;DR

- `type(scope): description`: imperative, lowercase start, no trailing period, under ~72 chars.
- The body explains **why**, not what. The diff already shows the what.
- One commit per reason to change. Test: can it be reverted alone without taking something
  unrelated with it?
- Breaking change: `!` before the colon and/or a `BREAKING CHANGE:` footer.
- Learn the repo's scopes from its history before inventing one.
- The build (with its type check) passes before the commit, not after.
- Reword only commits that are not pushed, unless the owner says otherwise.
- A PR title is a commit subject: with squash merge it becomes one. Same format, same rules.
- `fix` → patch, `feat` → minor, any breaking change → major.

## Before you write

```bash
git status
git diff --staged            # what is actually going in
git log --oneline -20        # the house style
git log --format=%s | grep -oE '^[a-z]+(\([^)]+\))?!?:' | sort | uniq -c | sort -rn | head -20
```

The last line lists the types and scopes the repo already uses. Check that the history really
follows the convention: commits from before it was adopted are not a model.

## Format

```
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

The colon and the space after it are required. The description starts right after them.

## Types

`feat` and `fix` are the only two the spec defines. The rest are convention.

| Type | Use for |
|---|---|
| `feat` | new behaviour a user can observe |
| `fix` | a defect. Say what was broken, not only what changed |
| `docs` | documentation, READMEs, agent instructions and skills |
| `refactor` | behaviour identical, structure different |
| `perf` | a measured improvement. Quote the before and after |
| `style` | formatting only, zero behaviour change |
| `test` | adding or changing tests only. Skip it in a repo with no tests |
| `build` | build tooling, containers, web server config, dependencies |
| `ci` | CI workflows |
| `chore` | housekeeping that fits nothing above. Reach for it last |
| `revert` | reverting an earlier commit; `Refs:` footer with its SHA ([how](references/spec.md#reverts)) |

Pick by what the change does for a user of the code, not by the files touched. A bug fix in a build
script is `fix(build)` if it was broken, `build` if it only changes how the build works. A dependency bump
that fixes a security advisory is `fix(deps)`; a routine bump is `chore(deps)` or `build(deps)`, whichever
the history uses.

## Scope

A noun naming the part of the codebase touched: a feature area, a layer, or a tool (`auth`,
`i18n`, `rtl`, `print`, `deps`, `docker`). Optional, but in a repo with clear seams it usually
writes itself. Use the scopes the history already has. If a change spans more than two scopes, it
is probably two commits.

## Description

Imperative mood, lowercase start, no trailing period, under ~72 characters. It completes the
sentence "If applied, this commit will …".

```
feat(lesson): add lesson 3 on food and drink
fix(print): restore the answer key hidden by the match block rewrite
refactor(blocks): render vocab through TargetText
```

Not:

```
Added lesson 3.              (past tense, full stop)
fix: bug                     (says nothing)
feat(blocks): update files   (says nothing)
```

Follow the repo if it uses a ticket prefix or a different case; consistency with the log beats
this file.

## Body

Optional. One blank line after the description, then free-form paragraphs wrapped at ~72.

Write one when the change is not self-evident from the diff. Explain the **why**:

- the failure mode being prevented;
- the constraint that forced this approach;
- the alternative you rejected, and the reason.

When a commit touches a convention the codebase depends on but nothing enforces (a print
contract, a bidi isolation class, a glob, module-level singletons, a "null means hidden" rule),
say so in the body. Those are the ones that break silently.

Don't narrate the session ("first I tried…"), list files, or restate the diff.

## Footers

One blank line after the body. A token, then `: ` or ` #`, then the value. Tokens use `-` instead
of spaces (`Reviewed-by`, `Refs`), which is what separates a footer from another body paragraph.
`BREAKING CHANGE` is the only token allowed to contain a space.

Use the attribution line (`Co-Authored-By: …`) that the environment or the owner specifies, and
only that one. Don't invent one.

## Breaking changes

Either a `!` before the colon, or a `BREAKING CHANGE:` footer, or both. `BREAKING-CHANGE` is a
synonym. The token must be uppercase; everything else in the format is case-insensitive.

With `!`, the `BREAKING CHANGE:` footer may be left out, and the description itself must then say what
breaks. Prefer both: the `!` for people scanning the log, the footer for the migration note.

A change is breaking when it forces work outside the commit: a public URL people were given
changes, an API or event contract changes, the shape of stored data or content changes, a config
key or environment variable is renamed, a supported version is dropped. A change that only affects
the app's own rendering is not breaking, however visible it is.

```
refactor(routes)!: consolidate on the programme pages

BREAKING CHANGE: /courses and /lesson/* are retired. They 301 to the new
pages in both the router and the web server config. Change one, change the
other: CI asserts the redirects against a real container.
```

## Splitting work

- One commit per reason to change. Could this commit be reverted on its own without undoing
  something unrelated?
- **Content and code go in separate commits.** A content update (`feat(content): add lesson 12`)
  should revert without undoing a component fix that landed the same afternoon.
- A refactor and the feature built on it are two commits: the refactor first, behaviour unchanged.
- Formatting churn gets its own `style` commit, or stays out of the diff.
- Stage by hunk when one file holds two reasons: `git add -p <file>`.

## Rewording

| Situation | Do |
|---|---|
| last commit, not pushed | `git commit --amend` (message only: `--amend -m "…"`, or `--amend` with no staged changes) |
| an older commit, not pushed | `git rebase -i <base>` and mark it `reword`. Without an interactive terminal, script both editors (`GIT_SEQUENCE_EDITOR` turns `pick <sha>` into `reword <sha>`, `GIT_EDITOR` writes the new message), or ask the owner to do it |
| already pushed to a shared branch | don't rewrite. Ask the owner; a force-push rewrites everyone's history |

Amending changes the commit's SHA. Never amend to "fix" a commit that a hook rejected: the commit
did not happen, so amending would change the previous one. Fix the problem and commit again.

## Before committing

- The build passes. If the build runs a type check first (for example `vue-tsc` before
  `vite build`), template errors surface only there. A commit that does not build is not finished.
- Lint and format the files you touched.
- For anything visual, check it in a real browser before committing, not after.
- Read `git diff --staged` once more. Nothing temporary, no secrets, no stray debug output.

## Pull requests

The short version; the details and the body template are in
[references/pull-requests.md](references/pull-requests.md).

- **Title** = a commit subject: `type(scope): description`, same rules. Squash merge turns it into the
  commit on the main branch, so a vague title becomes a vague history.
- **Body** for a reviewer who has not seen the conversation: what and why, how it was checked, what is
  left out on purpose, breaking changes, and the issue it closes (`Closes #12`).
- Use the repo's PR template when there is one; fill its headings, skip what does not apply.
- **One reason per PR**, like a commit. Unrelated fixes you noticed get their own PR.
- After review, push new commits; don't force-push a branch others have checked out.
- **Merge message:** with squash, rewrite the generated body (a list of "fix typo" commits) into the
  why, keep the attribution footers, and check the title once more.

