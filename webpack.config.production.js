const path = require("path");
const glob = require("glob");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const entry = require("./entry.json");

module.exports = {
    mode: "production",
    entry: Object.keys(entry).reduce((obj, cur) => {
        obj[cur] = entry[cur]["js"];
        return obj;
    }, {}),
    output: {
        filename: "js/[name].[chunkhash:8].bundle.js",
        path: path.resolve(__dirname, "build"),
        chunkFilename: "js/[name].[chunkhash:8].chunk.js"
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
                    /* style-loader를 대체*/
                    MiniCssExtractPlugin.loader,
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
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin({
                extractComments: false
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            },
            chunks: "all"
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: [
        /* .env 활성화 */
        new Dotenv({
            path: "./.env.production"
        }),
        /* 빌드 전에 기존 빌드 폴더를 제거 */
        new CleanWebpackPlugin(),
        /* pug -> html */
        new HtmlWebpackPugPlugin(),
        /* 로드한 css파일을 별도의 파일로 추출 */
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].bundle.css",
            chunkFilename: "css/[name].[chunkhash:8].chunk.css"
        }),
        /* js 축소 */
        new TerserJSPlugin(),
        /* css 최적화 / 최소화 기본적으로 cssnano 사용  */
        new OptimizeCSSAssetsPlugin(),
        /* 사용하지 않는 css 제거 */
        new PurgecssPlugin({
            paths: glob.sync(path.resolve(__dirname, "src/**/*"), {
                nodir: true
            })
        }),
        /* gzip 압축 */
        new CompressionPlugin({
            algorithm: "gzip"
        }),
        /* brotli 압축 */
        new BrotliPlugin()
    ].concat(
        Object.keys(entry).map(
            (key) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    chunks: [key],
                    template: entry[key]["pug"],
                    filename: `html/${key}.html`
                })
        )
    )
};
