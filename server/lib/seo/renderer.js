var phantom = require('phantom');

module.exports.render = function(url, callback) {
  phantom.create(
    '--disk-cache=no',
    '--load-images=no',
    '--local-to-remote-url-access=yes',
    function(ph) {
      ph.createPage(function(page) {
        page.set('settings.loadImages', false);
        page.set('settings.localToRemoteUrlAccessEnabled', true);

        page.open(url, function(status) {
          page.evaluate(function() {
            return document.getElementsByTagName('html')[0].outerHTML;
          }, function(result) {
            callback(result);
            ph.exit();
          });
        });
      });
    }
  );
};
