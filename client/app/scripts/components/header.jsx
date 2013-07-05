/**
 * @jsx React.DOM
 */

var Header = React.createClass({
  render: function() {
    return (
      <section class="jumbotron">
        <h1>Welcome!</h1>

        <p class="lead">
          You're ready to start working on your next great site!
        </p>

        <a href="http://genesis-skeleton.com/#/guide" class="btn btn-success">View Guide</a>
      </section>
    );
  }
});

module.exports = Header;
