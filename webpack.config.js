const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'messenger.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            // ts, tsx files
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            // styles
            {
                test: /\.css$/, loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // assets: fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            },
            // assets: images
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=10000!img-loader?progressive=true'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
        // open: true,
        hot: true,
        writeToDisk: true,
        // редирект на index.html, если страница не найдена
        historyApiFallback: true,

        // добавить поддержку https
    },
    // watch: true,
};