const path = require("path");
//Optimizar el html con webpack
const HtmlWebpackPlugin = require("html-webpack-plugin");
//Optimizar el css con webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Copiar archivos del src al dist!!
const CopyPlugin = require("copy-webpack-plugin");
//Darle mas Optimizaciones al css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//Darle más Optimizacion al js
const TerserPlugin = require("terser-webpack-plugin");
//Variables de entorno en Webpack
const Dotenv = require("dotenv-webpack");
//Limpiar los hash que se generan a partir de un build y dejar el ultimo hash que se realizo
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
  module: {
    rules: [
      // Integrar el babel (conpatible el js en todos los navegadores)
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // Integrar el Css tambien se pueden agrgar algun preprocesador
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Integrar las Imagenes
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      // Font
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
