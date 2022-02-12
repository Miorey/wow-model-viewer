module.exports = {
    root: true,
    parserOptions: {
        "sourceType": `module`,
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "globalReturn": false,
            "impliedStrict": false,
            "jsx": false,
            "experimentalObjectRestSpread": true
        }
    },
    env: {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true
    },
    extends: [
        `eslint:recommended`
    ],
    rules: {
        "indent": [
            `error`,
            4
        ],
        "linebreak-style": [
            `error`,
            `unix`
        ],
        "semi": [2, `always`],
        "quotes": [
            `error`,
            `backtick`
        ],
        "no-console": `off`,
    },
    // required to lint *.vue files
    "plugins": [],
};
