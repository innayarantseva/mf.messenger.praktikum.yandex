module.exports = {
    root: true,
    plugins: [
        '@typescript-eslint',
        'import'
    ],
    env: {
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        // 'eslint:recommended'
        // когда будет время включить проверку тайпингов
        // 'plugin:@typescript-eslint/eslint-recommended',
        // 'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'import/newline-after-import': ['error', { 'count': 2 }]
    }
};
