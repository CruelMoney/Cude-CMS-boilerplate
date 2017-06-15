const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');
const DeepMerge = require('deep-merge');
const Visualizer = require('webpack-visualizer-plugin');
const webpackSourceMapSupport = require("webpack-source-map-support");
require('dotenv').config()
const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);

// remove current build
fs.emptyDirSync(resolveOwn("./public/build/"));

const deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic
const defaultConfig = {
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  stats: {
      colors: true,
      chunks: false,
      children: false
  },
  performance: {
    hints: "warning",
  },
  module: {

    strictExportPresence: true,

    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{
          options: {
            formatter: eslintFormatter,
            // @remove-on-eject-begin
            baseConfig: {
              extends: [require.resolve('eslint-config-react-app')],
            },
            ignore: false,
            useEslintrc: false,
            // @remove-on-eject-end
          },
          loader: require.resolve('eslint-loader'),
        }, ],
        include: [resolveOwn('./server'), resolveOwn('./src')],
      },

      // ** ADDING/UPDATING LOADERS **
      // The "file" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list in the "file" loader.

      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.scss$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'build/static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'build/static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [{
            loader: 'babel-loader'
          },
          {
            loader: require.resolve('react-svg-loader'),
            query: {
              svgo: {
                plugins: [{
                  removeTitle: false
                }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: [resolveOwn('./server'), resolveOwn('./src')],
        
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          // @remove-on-eject-end
        },
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      { 
        test: [/\.scss$/,/\.css$/],
        loader: ExtractTextPlugin.extract({
          use: [
            //require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                  localIdentName: '[local].[hash:8]',
                  modules: true,
                  minimize: true,
                  sourceMap: true,
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('sass-loader')
            }
          ]
        }),
      }
    ],
  },
};


function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

const commonPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
           'PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
           'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
  }),
  // Minify the code.
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      // Disabled because of an issue with Uglify breaking seemingly valid code:
      // https://github.com/facebookincubator/create-react-app/issues/2376
      // Pending further investigation:
      // https://github.com/mishoo/UglifyJS2/issues/2011
      comparisons: false,
    },
    output: {
      comments: false,
    },
    sourceMap: true,
  }),
  new ExtractTextPlugin({
            filename: 'build/static/css/[name].css',
            allChunks: true,
            // dont use in development, here we want the hot stuff ;P
            disable: process.env.NODE_ENV !== 'production'
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

// frontend
var frontendConfig = config({
  entry: [
    require.resolve('./conf/polyfills'),
    resolveOwn("./src/index.js"),
  ],
  output: {
    path: resolveOwn('./public'),
    filename: 'build/static/js/main.js',
    chunkFilename: 'build/static/js/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    ...commonPlugins,
  ]
});




var backendConfig = config({
  entry: [
    require.resolve('./conf/polyfills'),
    resolveOwn("./src/serverRender.js"),
  ],
  target: 'node',
  //externals: [nodeExternals()],
  output: {
    path: resolveOwn('./public/build/server'),
    filename: 'serverRender.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  plugins: [
    ...commonPlugins,
    // //These files are handled by frontend builder
    // new webpack.IgnorePlugin(/\.(less|bmp|gif|jpe?g|png|scss|css)$/),
  ],
});


if(process.env.NODE_ENV === 'development'){
  backendConfig.plugins.push[new webpackSourceMapSupport()]
  frontendConfig.plugins.push[new Visualizer()]
}


// tasks
function onBuild(done) {
  return function (err, stats) {
    if (err) {
      err && console.log(err);
    }else{
      console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
      }));
    }
    // KILL EVERYTHING IF FAILING
    if (err || stats.hasErrors()) {
      process.exit()
    }
    if (done) {
      done();
    }
  }
}

gulp.task('frontend-build', function (done) {
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('backend-build', function (done) {
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('frontend-build-dev', function (done) {
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('backend-build-dev', function (done) {
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('build', ['frontend-build', 'backend-build']);

gulp.task('run', ['frontend-build-dev', 'backend-build-dev'], function () {
  const nodemon = require('nodemon')
  nodemon({
    script: resolveOwn('./server/index'),
    "watch": [
      "./server/"
     ],
   // exec: "babel-node",
  }).on('restart', function () {
    console.log('Patched!');
  });
});
