const path = require("path");
const webpack = require("webpack");
const appSrc = path.resolve(__dirname, "../src");
const appDist = path.resolve(__dirname, "../dist");
const appPublic = path.resolve(__dirname, "../public");
const appIndex = path.resolve(appSrc, "index.jsx");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const appHtml = path.resolve(appPublic, "index.html");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: "production",
  devtool: "hidden-source-map",
  entry: {
    main: [appIndex],
    common: ['react', 'react-dom', 'react-router-dom', 'mobx']
},
  output: {
    filename: "js/[name].[hash:8].js",
    path: appDist,
    publicPath: "/"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: appHtml,
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname,'../static/vendor.manifest.json'),
    // }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [appSrc],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            //bable7配置和.bablerc保持一致
            presets: [
              [
                "@babel/preset-env"
                // {
                //   targets: {
                //     edge: "17",
                //     firefox: "60",
                //     chrome: "67",
                //     safari: "11.1"
                //   },
                //   useBuiltIns: "entry",
                //   loose: false
                // }
              ],
              ["@babel/preset-react"]
            ],
            plugins: [
              [
                "babel-plugin-import",
                {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: "css"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
            // options: { minimize: true }
          },
          {
            loader: "stylus-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
            // options: { minimize: true }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
            // options: { minimize: true }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      // 解析数据资源
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      // 解析数据资源
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      // 解析 MakeDown 文件
      {
        test: /\.md$/,
        use: ["html-loader", "markdown-loader"]
      }
    ]
  },
  //在项目开发过程中，随着项目越来越大， 文件层级越来越深，
  // 引入文件的时候可能会需要一层一层的找路径，就会比较繁琐，我们可以使用 resolve 中的 alias
  // 属性为一些常用的文件夹设置别名
  resolve: {
    alias: {
      src: appSrc,
      untils: path.resolve(__dirname, "../src/utils")
    },
    //引入文件可以不适用扩展名
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx", ".less"]
  },
  optimization: {
    // 打包压缩js/css文件
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            // warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(css|less)/,
          chunks: "all",
          enforce: true,
          reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  performance: {
    hints: false
  }
};
module.exports = config;
