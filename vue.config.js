const CompressionWebpackPlugin = require('compression-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new GoogleFontsPlugin({
        fonts: [
          { family: 'Montserrat' }
        ]
      })
    ]
  }
}
