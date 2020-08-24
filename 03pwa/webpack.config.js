const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩 html 代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助 serviceworker 快速启动
        2.删除旧的 serviceworker

        生成一个 serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
}