// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    files: ['**/*.vue'],
    rules: {
      // Keep <script> blocks indented one level, as the rest of the codebase does.
      '@stylistic/indent': 'off',
      'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      'vue/max-attributes-per-line': ['error', { singleline: { max: 3 }, multiline: { max: 1 } }],
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    rules: {
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
      ]
    }
  }
);
