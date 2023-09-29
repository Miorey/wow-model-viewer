module.exports = {
    root: true,
    parserOptions: {
        sourceType: `module`,
        ecmaVersion: 2020,
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: false,
            jsx: false,
            experimentalObjectRestSpread: true
        }
    },
    env: {
        browser: true,
        node: true,
        "jest/globals": true,
        es6: true
    },
    extends: [
        `eslint:recommended`
    ],
    rules: {
        indent: [
            `error`,
            4
        ],
        "linebreak-style": [
            `error`,
            `unix`
        ],
        "quote-props": [`error`, `as-needed`],
        quotes: [
            `error`,
            `backtick`
        ],
        "no-console": `off`,
        semi: [
            `error`,
            `never`
        ]
    },
    // required to lint *.vue files
    plugins: [`jest`],
}
