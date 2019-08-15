
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.92.88.35:9999',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}

