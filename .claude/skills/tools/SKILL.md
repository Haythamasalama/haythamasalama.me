---
name: tools
description: How the Tools page on haythamasalama.me is organised and how to add, edit or recategorise a tool. Covers the YAML file per tool, the groups and categories in shared/tool-categories.ts, featured tools, icons, and how to write a tool's one-line description. Use for any change under content/tools or to the tool categories.
---

# Tools

`/tools` (`app/pages/tools.vue`) lists small tools the owner recommends. Groups are the filter chips; categories are the section headings inside each group. Both are defined in `shared/tool-categories.ts`.

## A tool

`content/tools/<slug>.yml`:

```yaml
name: BGJar
category: Backgrounds & CSS generators   # must be a name from shared/tool-categories.ts
kind: Web                                # where it runs: Web, Extension, App, VS Code…
description: Free SVG backgrounds with a live editor.
url: https://bgjar.com/
icon: lucide:paintbrush                  # lucide:* or simple-icons:* (the product's own logo if there is one)
featured: false                          # true lists it first in its category
```

## Categories

- **Use an existing category if one fits.** Otherwise add one line to `toolCategories`, with a `name`, its `group` and a one-sentence `description`. Never reuse a vague category to avoid adding one.
- **A group** is added to `toolGroups`. `isNew: true` marks a new group on its chip.
- **The schema reads the names from this file,** so a typo in a tool's `category` fails the build.

## Writing a description

- One sentence that says what the tool does for you, not what it is: "Turn code into images worth sharing." Under about 70 characters.
- No marketing words and no exclamation marks. Write in British spelling, as in the `content` skill.
- **Featured** is for the owner's real favourites only, one or two per category.

## Before you finish

- `npm run lint && npm run build` pass.
- On `/tools`, check that the filter chip, the section and the external link work. Tools open in a new tab.
- Check desktop and 375px, in both themes.
