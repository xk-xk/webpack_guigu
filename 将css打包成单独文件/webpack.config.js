const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssEtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs 的环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssEtractPlugin.loader,
                    'css-loader',
                    // 使用 loader 的默认配置写法
                    // 'postcss-loader'
                    // 修改 loader 的配置写法
                    {
                        loader: 'postcss-loader',
                        options: {
                            indent: 'postcss',
                            plugins: () => [
                                // postcss 的插件
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssEtractPlugin({
            // 对输出文件进行重命名
            filename: 'css/main.css',
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}