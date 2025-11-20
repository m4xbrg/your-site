import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**', '.astro/**', '**/*.astro'],
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {},
  },
]
