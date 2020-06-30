const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var ENV = process.env.npm_lifecycle_event;
var isDev = ENV === "webpack-dev";

module.exports = function make() {
    var cfg = {};

    if (isDev) {
        cfg.mode = 'development';
        cfg.devtool = "source-map";
    } else {
        cfg.mode = 'production';
    }

    cfg.entry = {
        main: ['./src/js/index.js', './src/scss/index.scss'],
        fonts: ['./src/js/index-fa.js'],
    };
    cfg.output = {
        filename: '[name].js',
        path: path.resolve(__dirname, './_site/assets')
    };
    cfg.plugins = [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ];


    cfg.module = {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { sourceMap: isDev }},
                    { loader: "css-loader", options: { sourceMap: isDev }},
                    { loader: "sass-loader", options: { sourceMap: isDev }}
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
            }
        ]
    };

    return cfg;
};
