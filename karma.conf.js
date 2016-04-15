module.exports = function(config){
  config.set({

    preprocessors: {
      'www/templates/*.html': ['ng-html2js']
    },

    basePath : './',

    files : [
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/js/app.js',
      'www/js/services.js',
      'www/js/**/*.js',
      'www/templates/*.html'
    ],

    ngHtml2JsPreprocessor: {

      stripPrefix: 'www/',
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
