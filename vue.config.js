// vue.config.js
module.exports = {
  outputDir: "docs",
  assetsDir: "assets",
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "/web-midi-router/" : "/"
};
