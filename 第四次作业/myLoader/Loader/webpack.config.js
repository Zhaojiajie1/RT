const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    resolveLoader: {
        module: ['node_modules', './loaders']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'resolveLoader'
                }
            ]
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}