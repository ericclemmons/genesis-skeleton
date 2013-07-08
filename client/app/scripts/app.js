/**
 * Auto-bootstrap components in markup based on `data-react="..."` attribute
 *
 * Example:
 *
 *  ```html
 *   <div data-react="view"></div>
 *   ````
 *
 *   Will autoload `React.components.view` into that node
 */

// Named components supported in DOM
// Note: cannot accept `props`
React.components = {
  view:     require('./components/view.jsx'),
  version:  require('./components/version.jsx')
};

// Bootstrap `data-react` components
(function($) {
  $('[data-react]').each(function() {
    var name        = this.getAttribute('data-react');
    var component   = React.components[name];

    if (!component) {
      throw new Error('Unregistered component: ' + name);
    }

    React.renderComponent(component(), this);
  });
})(jQuery);
