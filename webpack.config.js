var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Components/ContextMenu.js',
    output: {
        path: path.resolve('lib'),
        filename: 'ContextMenu.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}
