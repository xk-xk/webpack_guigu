const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  // entry: {
  //   main: './src/js/index.js',
  //   test:'./src/js/test.js'
  // },
  output: {
    // [name]:取文件名
    filename: 'js/built.[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },

  plugins: [
    // 压缩 css 资源
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩 html 代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
}