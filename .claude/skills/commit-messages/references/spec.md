# The Conventional Commits spec, rule by rule

**Read when:** a message is an edge case (several footers, a breaking change without `!`, a revert, a
multi-line footer), or a tool that parses commits (changelog, release, version bump) misreads one.
**Owns:** the 16 rules of the spec, the SemVer mapping, reverts, and what the spec leaves open.
**See also:** the everyday rules in [../SKILL.md](../SKILL.md).

Source: [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) (checked
2026-11-03). MUST / SHOULD / MAY as in RFC 2119.

## The rules, short

| # | Rule |
|---|---|
| 1 | A commit MUST start with a type (a noun), then an OPTIONAL scope, an OPTIONAL `!`, and a REQUIRED `: ` (colon and space). |
| 2 | `feat` MUST be used for a new feature. |
| 3 | `fix` MUST be used for a bug fix. |
| 4 | A scope MAY follow the type: a noun in parentheses, `fix(parser):`. |
| 5 | The description MUST come right after `: ` and is a short summary of the change. |
| 6 | A body MAY follow, starting one blank line after the description. |
| 7 | The body is free-form: any number of paragraphs separated by newlines. |
| 8 | One or more footers MAY follow, one blank line after the body. Each is a token, then `: ` or ` #`, then a value (the git trailer format). |
| 9 | A footer token MUST use `-` for spaces (`Acked-by`). Only `BREAKING CHANGE` keeps its space. |
| 10 | A footer value MAY contain spaces and newlines; it ends where the next `token: ` or `token #` starts. |
| 11 | A breaking change MUST be marked in the prefix or in a footer. |
| 12 | As a footer: uppercase `BREAKING CHANGE`, then `: `, then a description. |
| 13 | In the prefix: `!` right before the `:`. Then the footer MAY be left out and the description SHALL say what breaks. |
| 14 | Types other than `feat` and `fix` MAY be used (`docs: …`). |
| 15 | Parsers MUST treat every part as case-insensitive, except `BREAKING CHANGE`, which MUST be uppercase. |
| 16 | `BREAKING-CHANGE` means the same as `BREAKING CHANGE` in a footer. |

What follows from them:

- `feat:add x` (no space) and `feat : add x` (space before the colon) are not valid.
- A footer that is really a paragraph breaks parsing: `Note that this changes the cache` is body text,
  `Note: this changes …` is read as a footer with the token `Note`. Keep prose above the footers.
- The `!` goes after the scope: `feat(api)!: …`, not `feat!(api): …`.
- Case is free for parsers, but a log reads better when it is consistent. Lowercase types and scopes are
  the common choice.

## SemVer

| Commit | Version bump |
|---|---|
| `fix` | PATCH |
| `feat` | MINOR |
| anything with `!` or a `BREAKING CHANGE` footer, whatever its type | MAJOR |
| other types without a breaking change | none |

A `docs!:` or `refactor!:` is still a major bump. Release tools (semantic-release, release-please,
changesets with a plugin) read exactly these markers, so a wrong type ships a wrong version.

## Footers

```
fix(cache): drop entries after the key format changed

The old keys never matched again and the store grew without limit.

Refs: #482
Reviewed-by: Sam
Co-authored-by: Name <address>
```

- Common tokens: `Refs`, `Closes`, `Fixes`, `Reviewed-by`, `Acked-by`, `Co-authored-by`,
  `Signed-off-by`. `Closes #12` is a footer with the ` #` separator.
- Footers come last. A blank line inside the footer block ends nothing, but a line that does not start
  with a token continues the previous value (rule 10).
- `Co-authored-by` and `Signed-off-by` are read by GitHub and DCO bots; keep their exact casing and an
  address in angle brackets.

## Reverts

The spec suggests (it does not require) the `revert` type with a `Refs` footer naming the reverted SHAs:

```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

`git revert` writes `Revert "<original subject>"`. Rewrite it into the form above, and say in the body
why the change is going back out.

## What the spec leaves open

- The list of types beyond `feat` and `fix`. The common list (`docs`, `refactor`, `perf`, `style`, `test`,
  `build`, `ci`, `chore`, `revert`) comes from the Angular convention and `@commitlint/config-conventional`.
- Description length, mood and case. The ~72 characters, imperative mood and lowercase start in
  [../SKILL.md](../SKILL.md) are convention, kept because git tools and GitHub truncate around there.
- Scope names. Use the repo's.

## From the spec's FAQ

- **Wrong type, not yet merged or released:** reword it (`git rebase -i`). After release, leave it; fix
  the changelog by hand if it matters.
- **A commit that fits two types:** split it into two commits when you can. That is the point of the
  format.
- **Contributors who don't follow it:** with squash merging, the maintainer writes the final message at
  merge time. That is why the PR title matters.
- **Initial development:** start as if already released; a `feat` before 1.0.0 still describes a
  feature.
