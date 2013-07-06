/**
 * @jsx React.DOM
 */

var Column = React.createClass({
  getClassName: function() {
    var classes = [this.props.className];

    if (this.props.cols) {
      classes.push('span' + this.props.cols);
    }

    return classes.join(' ');
  },

  render: function() {
    return (
      <div class={this.getClassName()}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;
