const glob = require("glob");
const path = require("path");
const { merge } = require("webpack-merge");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const getCommonConfig = require("./webpack.common");

const prodConfig = {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "js/[name].[chunkhash:8].bundle.js",
        path: path.resolve(__dirname, "build"),
        chunkFilename: "js/[name].[chunkhash:8].chunk.js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            /* js 최적화 / 최소화 */
            new TerserJSPlugin({
                extractComments: true,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            }),
            /* css 최적화 / 최소화 */
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        /* 로드한 css파일을 별도의 파일로 추출 */
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].bundle.css",
            chunkFilename: "css/[name].[chunkhash:8].chunk.css"
        }),
        /* 사용하지 않는 css 제거 */
        new PurgecssPlugin({
            paths: glob.sync(path.resolve(__dirname, "src/**/*"), {
                nodir: true
            })
        }),
        /* gzip 압축 */
        new CompressionPlugin({
            algorithm: "gzip",
            threshold: 10240, // 10kb
            minRatio: 0.8
        }),
        /* brotli 압축 */
        new BrotliPlugin()
    ]
};

module.exports = merge(getCommonConfig({ mode: "production" }), prodConfig);
