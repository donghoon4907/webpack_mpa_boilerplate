const path = require("path");
const { merge } = require("webpack-merge");
const getCommonConfig = require("./webpack.common");

const getDevConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        historyApiFallback: true,
        index: "html/main.html",
        port: 4000,
        hot: true
    }
};

module.exports = merge(getCommonConfig({ mode: "development" }), getDevConfig);
