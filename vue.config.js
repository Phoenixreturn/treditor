module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
 
    svgRule.uses.clear();
 
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
            plugins: [
                {removeDoctype: true},
                {removeComments: true},
                {cleanupIDs: false},
                {collapseGroups: false},
                {removeEmptyContainers: false}
            ],
        },
    });
  },
}