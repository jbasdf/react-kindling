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
var nodemon       = require('gulp-nodemon');

var webpackDevServer  = require('webpack-dev-server');
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
gulp.task('default', ['serve:node', 'serve:webpack']);

gulp.task('build', ['clean'], function(callback){
  var tasks = ['images', 'assets', 'fonts'];
  if(settings.projectType == 'client'){
    tasks.push('html');
  }
  if(!release){
    tasks.unshift('hint');
  } else {
    // In dev the webpack dev server handles compiling assets, but when we release we need to run webpack
    tasks.unshift('webpack');
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
gulp.task('serve:node', ['build'], function(){
  var assign = require('react/lib/Object.assign');
  nodemon({
    script: path.join(__dirname, './server.js'),
    ext: 'js html',
    execMap: {
      js: "node --debug"
    },
    env: assign({ NODE_ENV: 'development' }, process.env)
  });
});

// Run webpack hot reload server
gulp.task('serve:webpack', function(){
  
  gutil.log('Starting Webpack hot load server');

  new webpackDevServer(webpack(webpackConfig), {
    //contentBase: 'http://localhost:' + settings.ports.hotPort,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  }).listen(settings.ports.hotPort, 'localhost', function(err, result){
    if(err){
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('Webpack hot load server listening on port ' + settings.ports.hotPort);
  });

});

gulp.task('release', function(callback){
  release = true;
  var tasks = ['build', 'deploy:amazon'];
  runSequence(tasks, callback);
});

// Deploy to Amazon S3
gulp.task('deploy:amazon', shell.task([
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
