"use strict";

import webpack from "webpack";
import dotenv from "dotenv";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import validate from "webpack-validator";
import merge from "webpack-merge";
dotenv.config();

const PATHS = {
    app: path.join(__dirname, "app"),
    data: path.join(__dirname, "data"),
    build: path.join(__dirname, "public")
};

const common = {
    entry: [
        PATHS.app
    ],
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin([PATHS.build], {
            root: process.cwd()
        }),
        new HtmlWebpackPlugin({
            title: "Mysterious Wildwood 84851",
            template: "./app/index.html.template"
        })
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ["react-hot-loader", "babel?cacheDirectory"],
                include: PATHS.app
            },
            {
                test: /\.json$/,
                loaders: ["json"],
                include: PATHS.data
            }
        ]
    },
    devtool: "source-map"
};

let config;
switch(process.env.NODE_ENV) {
    case "production":
        config = common;
        break;
    default:
        config = merge(
            common,
            {
                entry: [
                    "webpack-dev-server/client?http://0.0.0.0:3001",
                    "webpack/hot/only-dev-server",
                ],
                plugins: [
                    new webpack.HotModuleReplacementPlugin()
                ],
                devtool: "eval-source-map",
                devServer: {
                    hot: true,
                    contentBase: "app/",
                    historyApiFallback: true,
                    stats: "errors-only",
                    host: process.env.HOST,
                    port: process.env.DEV_PORT,
                    proxy: {
                        "/auth/google": "http://localhost:" + process.env.PORT,
                        "/api": "http://localhost:" + process.env.PORT,
                    }
                }
            }
        );
}

module.exports = validate(config);
