const path = require("path");
const webpack = require("webpack");
//__dirname 总是指向被执行 js 文件的绝对路径，文件路径读取从右向左
const appSrc = path.resolve(__dirname, "../src");
const appDist = path.resolve(__dirname, "../dist");
const appPublic = path.resolve(__dirname, "../public");
const appIndex = path.resolve(appSrc, "index.jsx");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const appHtml = path.resolve(appPublic, "index.html");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: [appIndex],
    common: ['react', 'react-dom', 'react-router-dom', 'mobx']
},
  output: {
    filename: "js/[name].[hash:8].js",
    path: appDist,
    publicPath: "/"
  },
  devServer: {
    contentBase: appPublic,
    sockHost: 'http://localhost:8000/',
    hot: true,
    host: "localhost",
    port: 8000,
    historyApiFallback: true,
    // 是否将错误展示在浏览器蒙层
    overlay: true,
    inline: true,
    // 打印信息
    stats: "errors-only",
    // 设置代理
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "https://easy-mock.com/mock/5c2dc9665cfaa5209116fa40/example",
        pathRewrite: {
          "^/api/": "/"
        }
      }
    }
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   lodash: '_',
  //   jquery: 'jQuery',
  //   d3: 'd3',
  //   echarts: 'echarts',
  //   moment: 'moment'
  // },
  plugins: [
    new HTMLWebpackPlugin({
      template: appHtml,
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
     new HardSourceWebpackPlugin(),
    new ProgressBarPlugin()

  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,  // 匹配node_modules目录下的文件
          priority: -10   // 优先级配置项
        },
        default: {
          minChunks: 2,
          priority: -20,   // 优先级配置项
          reuseExistingChunk: true
        }
      }
    }
  
},
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
                "@babel/preset-env",
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
            loader: "css-loader",
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
            loader: "css-loader",
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
            loader: "css-loader",
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
  }
};
module.exports = config;
