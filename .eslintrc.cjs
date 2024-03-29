module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    // General
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-before-function-paren': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'space-before-blocks': ['error', 'always'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'space-infix-ops': ['error', { int32Hint: false }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'no-console': 'off',
    'no-debugger': 'off',

    // Typescript
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',

    // Vuejs
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    'vue/multi-word-component-names': 0,
    'vue/no-multiple-template-root': 0,
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3
        }
      }
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': false
    }]
   }
};
