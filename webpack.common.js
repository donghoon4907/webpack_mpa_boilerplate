const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* entry points */
const entry = ["main", "error"];

module.exports = ({ mode }) => ({
    entry: entry.reduce((obj, cur) => {
        obj[cur] = path.resolve(__dirname, `src/ts/pages/${cur}.ts`);
        return obj;
    }, {}),
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
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
            path: `./.env.${mode}`
        }),
        /* 빌드 전에 기존 빌드 폴더를 제거 */
        new CleanWebpackPlugin()
    ].concat(
        entry.map(
            (key) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    chunks: [key],
                    template: path.resolve(__dirname, `src/pug/pages/${key}.pug`),
                    filename: `html/${key}.html`
                })
        )
    )
});
