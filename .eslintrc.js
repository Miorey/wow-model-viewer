module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        "sourceType": "module",
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
        "mocha": true
    },
    extends: [
        'standard',
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    rules: {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "backtick"
        ],
        "no-console": "off",
    },
  // required to lint *.vue files
  "plugins": [
    "vue"
  ],
};
