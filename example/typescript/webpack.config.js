const path = require(`path`)

module.exports = {
    mode: `development`,
    entry: `./example.ts`,
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `example.js`,
    },
    resolve: {
        extensions: [`.ts`, `.js`],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: `ts-loader`,
                exclude: /node_modules/,
            },
        ],
    },
}