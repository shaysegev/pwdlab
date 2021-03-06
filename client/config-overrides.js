const rewireLess = require('react-app-rewire-less')
const path = require('path')

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    Components: path.resolve(__dirname, 'src/components/'),
    Actions: path.resolve(__dirname, 'src/actions/')
  }

  config.resolve.extensions = [...config.resolve.extensions, '.js']

  config = rewireLess(config, env)
  
  return config
}