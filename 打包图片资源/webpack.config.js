const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // 使用多个loader处理用 use
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 问题：处理不了 html 中 img 图片
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 使用一个 loader
                // 下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于 8kb 时，就会被 base 64编码
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大(文件请求速度更慢)
                    limit: 8 * 1024,
                    //给图片重命名
                    // [hash:10] 取图片hash值的前10为
                    // [ext]取文件原来的扩展名
                    name:'[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件中的img图片（负责引入img，从而能被url-loader处理）
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}