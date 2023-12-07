module.exports = ({ isDev, pteroAssetsPath }) => {
  console.log('pteroAssetsPath', pteroAssetsPath)
  console.log('isDevisDev', isDev)
  return {
    output: {
      filename: isDev ? '[name].js' : '[name]-[contenthash].js',
      path: pteroAssetsPath,
      publicPath: '/web_assets/',
    },
  }
}
