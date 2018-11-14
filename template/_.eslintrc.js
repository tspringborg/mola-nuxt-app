module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-indent': ['error', 4],
        "indent": "off",
        // indent-legacy works properly with vue script tags (https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/v-bind-style.md)
        "indent-legacy": ["error", 4],
        'linebreak-style': ['error', 'unix'],
        'object-shorthand': ['warn', 'always'],
        'func-names': ['error', 'as-needed'],
        'no-param-reassign': [1, { props: false }],
        'max-len': 'off',
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-undef': 'off',
        'no-bitwise': 'off',
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "comma-dangle": ["error", "always-multiline"],
        // not so sure about these rules? waddya think?
        'vue/html-self-closing': 'warn',
        "vue/v-bind-style": "warn",
        "vue/max-attributes-per-line": "warn",
        "vue/require-prop-types": "warn",
        "vue/v-bind-style": "warn",
    }
}
