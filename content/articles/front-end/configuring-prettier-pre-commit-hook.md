---
title: 'Configuring a Prettier pre-commit hook'
description: 'Prettier, Husky and lint-staged in four steps, so unformatted code never reaches a commit.'
date: '2023-01-16'
category: 'Front end'
icon: 'simple-icons:javascript'
readingTime: '1 min read'
---

### 1. Install Prettier

```bash [terminal]
npm install --save-dev --save-exact prettier
```

### 2. Create Prettier Configuration File

Create a `.prettierrc` file and paste your configuration into it. For more options, refer to the [Prettier documentation](https://prettier.io/docs/en/options.html).

```json [.prettierrc]
{
  "arrowParens": "avoid",
  "singleQuote": true,
  "semi": true,
  "bracketSameLine": false,
  "bracketSpacing": true,
  "vueIndentScriptAndStyle": true,
  "trailingComma": "es5",
  "singleAttributePerLine": true,
  "jsxBracketSameLine": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100
}
```

### 3. Set Up Pre-commit Hook

```bash [terminal]
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "lint-staged"
```

### 4. Update `package.json` with lint-staged Configuration

```json [package.json]
 "lint-staged": {
    "*.js": "eslint --fix",
    "{**/*,*}.{js,vue,html,css}": "prettier --write"
 }
```

### References

- [lint-staged](https://github.com/okonet/lint-staged)

- [Husky](https://github.com/typicode/husky)

- [Prettier options](https://prettier.io/docs/en/options.html)

- [Prettier pre-commit hook](https://prettier.io/docs/en/precommit.html)
