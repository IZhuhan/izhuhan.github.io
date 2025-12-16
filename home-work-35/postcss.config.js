module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 3,
      feature: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true
      },
      autoprefixer: {
        grid: 'autoplace'
      }
    })
  ],
};