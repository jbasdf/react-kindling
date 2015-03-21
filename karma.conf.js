// karma config info: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function(config) {
  
  function isCoverage(argument) {
    return argument === '--coverage';
  }
  
  // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
  var reporters = ['spec'];

  var webpackServerConfig = {
    noInfo: true,
    stats: {
      colors: true
    }
  };

  if(process.argv.some(isCoverage)){
    reporters.push('coverage');
  }

  var testConfig = {

    captureTimeout: 60000,
    browserNoActivityTimeout: 60000,

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

    // Run the tests using the PhantomJS for continuous integration or
    // switch to Firefox or Chrome to observe the tests. Be sure to install
    // the launcher for each browser used
    // npm install --save-dev karma-firefox-launcher
    // npm install --save-dev karma-chrome-launcher
    browsers: ['Chrome'], // 'PhantomJS', 'Firefox' 'Chrome'

    // Exit the test runner as well when the test suite returns.
    singleRun: false,

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
    webpackMiddleware: webpackServerConfig,
    webpackServer: webpackServerConfig,
    
    colors: true,
    autoWatch: true
  };


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
