const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/stock": {
          target: "http://localhost:3002",
      }
    }
  }
})