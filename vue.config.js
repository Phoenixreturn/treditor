module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear();
    // svgRule.oneOfs.clear();

    svgRule
      .oneOf('vue')
        .exclude
          .add(/src/)
          .end()
        .use('file-loader')
          .loader('file-loader')
          .options({ 
            name: 'img/[name].[hash:8].[ext]'
          })
          .end()
        .end()
      .oneOf('vue2')
        .exclude
          .add(/node_modules/)
          .end()
        .use('vue-svg-loader')
          .loader('vue-svg-loader')
          .options({
            svgo: {
              plugins: [
                { removeDoctype: true },
                { removeComments: true },
                { cleanupIDs: false },
                { collapseGroups: false },
                { removeEmptyContainers: false }
              ],
            }
          })
          .end()




  },
}