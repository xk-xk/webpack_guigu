const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 
    entry: './src/index.js',
    output: {
        filename: 'js/built.js', // 可以指定输出到 build/js/文件夹下
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader 的配置
            {
                // 处理 less 资源
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理 css 资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // 关闭 es6 模块化
                    // es6Module: false
                    outputPath: 'imgs', // 指定输出到 build/imgs/ 文件夹下面
                }
            },
            {
                // 处理 html 中的 img 资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(css|less|img|js|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10],[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // plugins 的配置
        // 处理 html 资源
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 自动化打包配置
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    },
}