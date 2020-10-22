const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const entry = require("./entry.json");

module.exports = {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    entry: Object.keys(entry).reduce((obj, cur) => {
        obj[cur] = entry[cur]["js"];
        return obj;
    }, {}),
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader" /* 로드한 css파일들을 style태그로 만들어 head태그에 넣어줍니다 */,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/"
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: {
                    loader: "pug-loader"
                }
            }
        ]
    },
    plugins: [
        /* .env 활성화 */
        new Dotenv({
            path: "./.env.development"
        }),
        /* 빌드 전에 기존 빌드 폴더를 제거 */
        new CleanWebpackPlugin(),
        /* pug -> html */
        new HtmlWebpackPugPlugin(),
        /* 전역 모듈 설정 */
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ].concat(
        Object.keys(entry).map(
            (key) =>
                new HtmlWebpackPlugin({
                    template: entry[key]["pug"],
                    filename: key + ".html"
                })
        )
    ),
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        historyApiFallback: true,
        index: "main.html",
        port: 4000,
        hot: true
    }
};
