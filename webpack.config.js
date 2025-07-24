const webpack = require('webpack')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isDevelopment = !isProduction

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      index: './src/index.ts'
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      libraryTarget: 'umd',
      library: 'reactive-shared',
      umdNamedDefine: true,
      globalObject: 'this'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      fallback: {
        "buffer": require.resolve("buffer"),
        "util": require.resolve("util"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url"),
        "process": require.resolve("process/browser"),
              "stream-http": require.resolve("stream-http")
      }
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      },
      yup: 'yup',
      lodash: 'lodash',
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
      '@mui/system': '@mui/system',
      '@mui/x-date-pickers': '@mui/x-date-pickers',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      '@fontsource/roboto': '@fontsource/roboto',
      'react-router-dom': 'react-router-dom',
      '@tanstack/react-query': '@tanstack/react-query',
      'react-hook-form': 'react-hook-form',
      '@hookform/resolvers': '@hookform/resolvers',
      'date-fns': 'date-fns',
      moment: 'moment',
      'moment-timezone': 'moment-timezone',
      'react-number-format': 'react-number-format',
      'react-infinite-scroll-component': 'react-infinite-scroll-component'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      }),
      ...(isDevelopment ? [new HtmlWebpackPlugin({
        template: 'public/index.html'
      })] : []),
      ...(env && env.analyze ? [new BundleAnalyzerPlugin()] : [])
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource'
        }
      ]
    },
    optimization: {
      minimize: isProduction,
      splitChunks: isProduction ? {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      } : false
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true
    },
    performance: {
      hints: isProduction ? 'warning' : false
    }
  }
}