module.exports = {
    root: true,
    env: {
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': ['error'],
    },
    overrides: [
        {
            files: ['src/views/*.vue'],
            rules: {
                'vue/multi-word-component-names': 0,
            },
        },
    ],
}
