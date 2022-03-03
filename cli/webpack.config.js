/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin')

const distPackageJson = {
  name: '@zup-it/beagle-ts',
  version: '1.0.0',
  description: 'CLI for Beagle Backend using TypeScript',
  main: './index.js',
  bin: {
    'beagle-ts': './index.js',
  },
  author: 'Arthur Bleil <arthur.bleil@zup.com.br>',
  license: 'Apache-2.0',
  licenses: [
    {
      type: 'Apache-2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0',
    },
  ],
  private: false,
  dependencies: {
    'chalk': '^4.1.0',
    'clear': '^0.1.0',
    'commander': '^9.0.0',
    'fs-extra': '^10.0.0',
  },
}

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  devtool: false,
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: 'beagleTs',
      type: 'commonjs',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new CopyPlugin({
      patterns: [
        { from: './src/templates', to: 'templates' },
      ],
    }),
    new GeneratePackageJsonPlugin(distPackageJson),
  ],
}
