const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const jsYaml = require('js-yaml')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { breakpoints } = require('./breakpoints.json')

module.exports = ({ config, env, isDev, pteroAssetsPath }) => {
  const getTranslationsDefault = () => {
    return jsYaml.load(fs.readFileSync(
      path.join(
        __dirname,
        '../locales/en.yml'
      )))
  }

  const sharedPlugins = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../public',
          to: path.resolve(isDev || process.env.BUNDLE_ANALYZER ? '../../../public' : 'dist'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify({
        stageApi: process.env.STAGE_URL || null,
        ...config,
        env,
        pp: path.resolve(__dirname, '../../src'),
      }),
      __DEV__: JSON.stringify(isDev),
      breakpoints: JSON.stringify(breakpoints),
      __TRANSLATIONS_DEFAULT__: JSON.stringify(getTranslationsDefault()),
    }),
    new AssetsPlugin({
      path: pteroAssetsPath,
      removeFullPathAutoPrefix: true,
      prettyPrint: true,
      filename: 'project-assets.json',
      metadata: {
        preloadChunks: [],
      },
      processOutput (assets) {
        assets.metadata.preloadChunks = Object.keys(assets).filter(key => key.includes("[preload]"))

        return JSON.stringify(assets)
      },
    }),
  ]

  const prodactionPlugins = isDev ? [] : [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      ignoreOrder: true,
    }),
    new CssMinimizerPlugin(),
  ]

  if (process.env.BUNDLE_ANALYZER) {
    prodactionPlugins.push(
      new BundleAnalyzerPlugin()
    )
  }

  return { plugins: [...sharedPlugins, ...prodactionPlugins] }
}
