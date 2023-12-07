/* eslint-env node */

const path = require('path')
const makeAppConfig = require('./config/appConfig')
const assignEnvToConfig = require('./config/webpack/assignEnvToConfig')
const buildConfig = require('./config/webpack/buildConfig')

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const assetsPath = isDev || process.env.BUNDLE_ANALYZER
  ? path.join(__dirname, '../../../public', 'web_assets')
  : path.join(path.resolve('dist'), 'web_assets')

const config = makeAppConfig(env)
assignEnvToConfig(config)

const buildConfiguration = pathConfig => {
  return pathConfig.reduce(
    (acc, part, i) => {
      return ({
        ...acc,
        ...part({
          env,
          isDev,
          config,
          assetsPath,
        }),
      })
    },
    {}
  )
}

module.exports = buildConfiguration(buildConfig)
