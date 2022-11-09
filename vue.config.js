const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081
  },
  css: {
    extract:false  
  },
  transpileDependencies: true
})
