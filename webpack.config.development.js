const path = require("path");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader" /* 로드한 css파일들을 style태그로 만들어 head태그에 넣어줍니다 */, "css-loader", "sass-loader", "postcss-loader"]
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    name: "[hash].[ext]",
                    /* limit 보다 작은 파일은 base64 인코딩 및 인라인화, 큰 파일은 file-loader가 파일로 처리 */
                    limit: 10000
                }
            },
            {
                test: /\.pug$/,
                loader: "pug-loader"
            }
        ]
    },
    plugins: [
        /* .env 활성화 */
        new Dotenv({
            path: "./.env.development"
        }),
        /* 빌드 전에 기존 빌드 폴더를 제거 */
        new CleanWebpackPlugin()
    ].concat(
        Object.keys(entry).map(
            (key) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    chunks: [key],
                    template: entry[key]["pug"],
                    filename: key + ".html"
                })
        )
    ),
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        index: "main.html",
        port: 4000,
        hot: true
    }
};
