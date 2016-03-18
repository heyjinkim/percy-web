var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      comments: false,
      includePolyfill: true,
    }
  });

  app.import('bower_components/accounting.js/accounting.js');
  app.import('bower_components/hint.css/hint.css');
  app.import('vendor/highlight/styles/github.css');
  app.import('vendor/highlight/highlight.pack.js');

  return app.toTree();
};
