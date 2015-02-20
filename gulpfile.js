var gulp          = require('gulp');
var gutil         = require('gulp-util');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var jshint        = require('gulp-jshint');
var imagemin      = require('gulp-imagemin');
var htmlmin       = require('gulp-htmlmin');
var embedlr       = require("gulp-embedlr");
var fileinclude   = require('gulp-file-include');
var gulpif        = require('gulp-if');
var replace       = require('gulp-replace');
var rename        = require('gulp-rename');
var shell         = require('gulp-shell');

var runSequence       = require('run-sequence');
var path              = require('path');
var argv              = require('minimist')(process.argv.slice(2));
var pagespeed         = require('psi');
var webpack           = require('webpack');
var del               = require('del');

var release           = argv.release || false;
var settings          = require('./config/settings.js');
var webpackConfig     = require('./config/webpack.config.js')(release);

// Tasks
gulp.task('default', ['serve:hot', 'serve:sync']);

gulp.task('build', ['clean'], function(callback){
  var tasks = ['webpack', 'images', 'assets', 'fonts'];
  if(settings.projectType == 'client'){
    tasks.push('html');
  }
  if(!release){
    tasks.unshift('hint');
  }
  runSequence(tasks, callback);
});

gulp.task('clean', function(callback){
  if(release){
    del([settings.prodOutput], callback);
  } else {
    del([settings.devOutput], callback);
  }
});

// js packaging with webpack
gulp.task('webpack', function(callback){
  webpack(webpackConfig, function (err, stats){
    if(err){
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('webpack', stats.toString({ colors: true }));
    return callback();
  });
});

gulp.task('hint', function(){
  return gulp.src(settings.scripts.paths.all)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('images', function(){
  var images = gulp.src(settings.images.paths.all);
  if(release){
    return images
      .pipe(imagemin({
        optimizationLevel: settings.images.compression,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(settings.images.paths.output.prod));
  } else {
    return images
      .pipe(gulp.dest(settings.images.paths.output.dev));
    }
});

gulp.task('assets', function(){
  var assets = gulp.src(settings.assets.paths.all);
  if(release){
    return assets
      .pipe(gulp.dest(settings.assets.paths.output.prod));
  } else {
    return assets
      .pipe(gulp.dest(settings.assets.paths.output.dev));
  }
});

gulp.task('fonts', function(){
  var fonts = gulp.src(settings.fonts.paths.all);
  if(release){
    return fonts
      .pipe(gulp.dest(settings.fonts.paths.output.prod));
  } else {
    return fonts
      .pipe(gulp.dest(settings.fonts.paths.output.dev));
  }
});

// Build html. This will also use fileinclude for basic partial includes.
gulp.task('html', function(){
  var html = gulp.src([settings.html.paths.all, settings.html.paths.ignore])
    .pipe(fileinclude())
    .pipe(rename({ extname: "" }))
    .pipe(rename({ extname: ".html" }));
      
  if(release){
    return html
      .pipe(embedlr())
      .pipe(gulp.dest(settings.html.paths.output.dev));
  } else {
    return html
      .pipe(htmlmin({ removeComments: true, collapseWhitespace: true, minifyJS: true }))
      .pipe(gulp.dest(settings.html.paths.output.prod));
  }
});

// Launch the node server
gulp.task('serve', ['build'], function(callback) {
  var started = false;
  var cp = require('child_process');
  var assign = require('react/lib/Object.assign');

  var server = (function startup(){
    var child = cp.fork(path.join(__dirname, './server.js'), {
      env: assign({ NODE_ENV: 'development' }, process.env)
    });
    child.once('message', function(message){
      if(message.match(/^online$/)) {
        if(browserSync){
          browserSync.reload();
        }
        if(!started){
          started = true;
          gulp.watch(settings.appFiles, function (file) {
            gutil.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          callback();
        }
      }
    });
    return child;
  })();

  process.on('exit', function() {
    server.kill('SIGTERM');
  });
});

// Launch BrowserSync development server
gulp.task('serve:sync', ['serve'], function(callback) {
  browserSync = require('browser-sync');

  browserSync({
    notify: false,
    // Run as an https by setting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    https: false,
    // browser-sync proxies the node app at:
    proxy: 'localhost:' + settings.ports.reloadProxy
  }, callback);

  process.on('exit', function() {
    browserSync.exit();
  });

  gulp.watch([
        settings.html.paths.all,
        settings.images.paths.all,
        settings.assets.paths.all,
        settings.fonts.paths.all
      ].concat(settings.appFiles.map(function(file) {return '!' + file;})
    ), function(file) {
      browserSync.reload(path.relative(__dirname, file.path));
  });
});

gulp.task('serve:hot', function(){
  gutil.log('Stargin Webpack hot load server');
  var webpackDevServer = require('webpack-dev-server');

  new webpackDevServer(webpack(webpackConfig), {
    //contentBase: 'http://localhost:' + settings.ports.hotPort,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  }).listen(settings.ports.hotPort, 'localhost', function(err, result){
    if(err){
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('Webpack hot load server listening on port ' + settings.ports.hotPort);
  });
});

// Deploy to Amazon S3
gulp.task('deploy:amazon', shell.task([
  'gulp build --release',
  's3_website push'
]));

// Deploy to GitHub Pages
gulp.task('deploy:github', function(){

  var ghPages = require('gulp-gh-pages');

  // Remove temp folder
  if(argv.clean){
    var os = require('os');
    var repoPath = path.join(os.tmpdir(), 'tmpRepo');
    gutil.log('Delete ' + gutil.colors.magenta(repoPath));
    del.sync(repoPath, {force: true});
  }

  return gulp.src(settings.prodOutput + '/**/*')
    .pipe(gulpif('**/robots.txt', !argv.production ? replace('Disallow:', 'Disallow: /') : gutil.noop()))
    .pipe(ghPages({
      remoteUrl: 'https://github.com/{name}/{name}.github.io.git',
      branch: 'master'
    }));
});

// Run PageSpeed Insights
gulp.task('pagespeed', function(callback) {
  pagespeed.output(settings.applicationUrl, {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, callback);
});