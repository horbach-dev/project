const FORWARDED_URLS = [
  '/api',
  '/',
]

module.exports = ({ isDev, config, pteroAssetsPath }) => {
  // const port = config.backendPort
  if (isDev) {
    return {
      devServer: {
        static: {
          directory: pteroAssetsPath,
        },
        // proxy: FORWARDED_URLS.reduce(
        //   (acc, url) => ({
        //     ...acc,
        //     [url]: { target: { host: '0.0.0.0', protocol: 'http:', port } },
        //   }),
        //   {}
        // ),
        hot: false,
        liveReload: false,
        open: true,
      },
    }
  }
  return {}
}
