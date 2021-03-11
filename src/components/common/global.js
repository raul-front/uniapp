export default {
  install (Vue) {
    const requireComponent = require.context('.', true, /\.vue$/)
    requireComponent.keys().forEach(fileName => {
      const config = requireComponent(fileName)
      const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
      Vue.component(componentName, config.default || config)
    })
  },
}
