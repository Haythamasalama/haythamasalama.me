// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      // Script blocks are indented one level inside <script>.
      '@stylistic/indent': 'off',
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
      'vue/html-indent': ['error', 2],
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/max-attributes-per-line': ['error', { singleline: { max: 3 } }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }]
    }
  }
);
