---
title: Configuring Prettier pre-commit hook
description: 'meta description of the page'
author: 
  username: 'haythamasalama'
  platform: 'twitter'
date: '2023-01-16'
readTime: '1 min'
---

### 1. Install Pritter

```bash
npm install --save-dev --save-exact prettier
```

### 2. Create Prettier Configuration File

Create a `.prettierrc` file and paste your configuration into it. For more options, refer to the [ Prettier documentation.](https://prettier.io/docs/en/options.html)

```json
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

```bash
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "lint-staged"
```

## 4. Update `package.json` with Lint-Staged Configuration

```json
 "lint-staged": {
    "*.js": "eslint --fix",
    "{**/*,*}.{js,vue,html,css}": "prettier --write"
 }
```

### References

- [lint staged](https://github.com/okonet/lint-staged)

- [husky](https://github.com/typicode/husky)

- [prettier options](https://prettier.io/docs/en/options.html)

- [prettier precommit](https://prettier.io/docs/en/precommit.html)
