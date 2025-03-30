const webpack = require('webpack');

module.exports = {
  // ...existing configuration...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider')
    })
  ]
};