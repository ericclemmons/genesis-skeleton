/**
 * @jsx React.DOM
 */

var Column = React.createClass({
  getClassName: function() {
    return [this.props.className, 'span' + this.props.cols].join(' ');
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
