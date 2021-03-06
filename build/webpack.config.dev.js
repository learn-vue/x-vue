// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const autoprefixer = require('autoprefixer')
//
// function postcss() {
//   return [
//     autoprefixer({
//       browsers: '> 1%'
//     })
//   ]
// }
//
// module.exports = {
//   devtool: '#cheap-eval-source-map',
//   entry: [path.join(__dirname, '../doc/doc.js'), 'webpack-hot-middleware/client?reload=true'],
//   debug: true,
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: 'index.js',
//     publicPath: '/'
//   },
//   resolve: {
//     alias: {
//       component: path.resolve(__dirname, '../component'),
//       util: path.resolve(__dirname, '../util'),
//     }
//   },
//   module: {
//     preLoaders: [
//       { test: /\.(js|vue)$/, loader: 'eslint', exclude: /node_modules/ }
//     ],
//     loaders: [
//       { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
//       { test: /\.vue/, loader: 'vue' },
//       { test: /\.styl/, loader: 'style!css!postcss!stylus' },
//       { test: /\.css/, loader: 'style!css' },
//       { test: /\.doc/, loader: '../demo-loader/loader' },
//       { test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)(\?.*)?$/,
//         loader: 'url',
//         query: {
//           limit: 8912,
//           name: 'static/resources/[name].[hash:8].[ext]'
//         }
//       },
//     ]
//   },
//   vue: {
//     postcss: postcss
//   },
//   postcss: postcss,
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"development"'
//       }
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, '../doc/index.html'),
//       filename: 'index.html'
//     })
//   ]
// }

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultConfig = require('./webpack.base')

const config = Object.assign({}, defaultConfig, {
  entry: [path.join(__dirname, '../doc/doc.js'), 'webpack-hot-middleware/client?reload=true'],
  debug: true
})

config.module.loaders.push({ test: /\.styl/, loader: 'style!css!postcss!stylus' })
config.module.loaders.push({ test: /\.css/, loader: 'style!css' })

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new webpack.NoErrorsPlugin())
config.plugins.push(new HtmlWebpackPlugin({
  template: path.join(__dirname, '../doc/index.html'),
  filename: 'index.html'
}))

module.exports = config
