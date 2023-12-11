module.exports = ({ isDev, assetsPath }) => {
  if (isDev) {
    return {
      devServer: {
        static: {
          directory: assetsPath,
        },
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        open: true,
      },
    }
  }
  return {}
}
