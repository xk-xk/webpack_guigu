const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 处理 css 兼容，需要在 package.json 中指定 browseslist 
    loader: 'postcss-loader',
    options: {
      indent: 'postcss',
      plugins: () => [
        require('postcss-preset-env')
      ]
    }
  }
]

// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { // 处理 css 资源
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        // 处理 less 资源
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
      // 正常来讲，一个文件只能被一个loader处理，
      // 当一个文件要被多个 loader 处理，那么一定要指定 loader 执行的先后顺序
      // 先执行 eslint-loader，再执行 babel-loader
      {
        // 处理 js 语法检查
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 处理 js 兼容性
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {
                version: 3
              },
              // 指定兼容性做到哪个版本浏览器
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17'
              }
            }
          ]
        }
      },
      // 处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-laoder',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      // 处理html 中的图片资源
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 处理其他文件
      {
        exclude: /\.(css|less|js|jpg|pmg|gif|html)$/,
        loader: 'file-loader',
        optimize: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // 压缩 css 资源
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
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
  mode: 'production'
}