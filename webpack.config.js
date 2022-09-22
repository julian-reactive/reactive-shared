const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts'
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'reactive-shared',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    yup: 'yup',
    lodash: 'lodash',
    '@mui': '@mui',
    '@mui/material': '@mui/material',
    '@mui/lab': '@mui/lab',
    '@mui/icons-material': '@mui/icons-material',
    '@mui/system': '@mui/system',
    '@fontsource/roboto': '@fontsource/roboto'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   // sourceMap: true,
    //   include: /\.min\.js$/
    // }),
    new webpack.ProgressPlugin()
    // new BundleAnalyzerPlugin() /// this create a report about how is distributed components
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      usedExports: true
    }
  }
}
