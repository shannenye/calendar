// const LiveReloadPlugin = require('webpack-livereload-plugin')
// const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: './CalendarFrontEnd/browser/index.js',
    output: {
      path: __dirname,
      filename: './CalendarFrontEnd/public/bundle.js'
    },
    mode: 'development',
    devtool: 'source_map',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'stage-2', 'env']
          }
        }
      ]
    },
    // plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []
  };