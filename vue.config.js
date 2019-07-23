module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.105.164.183:9999',
        // target: 'http://pigx-gateway:9999',
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/admin': {
        target: 'http://47.105.164.183:9999/admin',
        ws: true,
        pathRewrite: {
          '^/admin': ''
        }
      }
    }
  }
}
