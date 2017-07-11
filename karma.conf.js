const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    autoWatchBatchDelay: 300,
    files: [
      './app/**/*.spec.js'
    ],
    webpack: webpackConfig,
    preprocessors: {
      './app/**/*.spec.js': ['webpack'],
    }
  });
};
