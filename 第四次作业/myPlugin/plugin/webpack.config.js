const OutLogPlugin = require('./plugins/OutLogPlugin.js')
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: "./src/index.js"
    },
    plugins: [
        new OutLogPlugin({ outFileName: "buildInfo" })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    }
}