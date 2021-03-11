const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('styles', resolve('src/styles'))
      .set('components', resolve('src/components'))
  },
  lintOnSave: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: "@import '~styles/mixins.scss';",
      },
    },
  },
}
