// karma config info: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function(config) {
  
  function isCoverage(argument) {
    return argument === '--coverage';
  }
  
  // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
  var reporters = ['spec'];

  if(process.argv.some(isCoverage)){
    reporters.push('coverage');
  }

  var testConfig = {

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // How long will Karma wait for a message from a browser before disconnecting from it (in ms)
    browserNoActivityTimeout: 60000,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // web server port
    port: 9876,

    files: [
      './specs/spec_helper.js',
      //'./specs/**/*.spec.js'        // Use webpack to build each test individually. If changed here, match the change in preprocessors
      './specs/tests.webpack.js'      // More performant but tests cannot be run individually
    ],

    // Transpile tests with the karma-webpack plugin
    preprocessors: {
      //'./specs/**/*.spec.js': ['webpack', 'sourcemap']      // Use webpack to build each test individually. If changed here, match the change in files
      './specs/tests.webpack.js': ['webpack', 'sourcemap']    // More performant but tests cannot be run individually
    },

    // Run the tests using any of the following browsers
    // - Chrome         npm install --save-dev karma-chrome-launcher
    // - ChromeCanary
    // - Firefox        npm install --save-dev karma-firefox-launcher
    // - Opera          npm install --save-dev karma-opera-launcher
    // - Safari         npm install --save-dev karma-safari-launcher  (only Mac)
    // - PhantomJS      npm install --save-dev karma-phantomjs-launcher
    // - IE             npm install karma-ie-launcher (only Windows)
    browsers: ['Chrome'],

    // Exit the test runner as well when the test suite returns.
    singleRun: false,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Use jasmine as the test framework
    frameworks: ['jasmine'],

    reporters: reporters,

    // karma-webpack configuration. Load and transpile js and jsx files.
    // Use istanbul-transformer post loader to generate code coverage report.
    webpack: {
      devtool: 'eval',
      module: {
        loaders: [
          { test: /\.js$/,   exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules", "vendor"]
      }
    },

    // Reduce the noise to the console
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    }

  };


  // Generate code coverage report if --coverage is specified
  if(process.argv.some(isCoverage)) {
    // Generate a code coverage report using `lcov` format. Result will be output to coverage/lcov.info
    // run using `npm coveralls`
    testConfig['webpack']['module']['postLoaders'] = [{
      test: /\.jsx?$/,
      exclude: /(test|node_modules)\//,
      loader: 'istanbul-instrumenter'
    }];

    testConfig['coverageReporter'] = {
      dir: 'coverage/',
      reporters: [
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'html', subdir: 'html' }
      ]
    };
  }

  config.set(testConfig);
};
