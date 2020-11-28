var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/JamCMS.js',
  output: {
    path: path.resolve('lib'),
    filename: 'JamCMS.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
}
