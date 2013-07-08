/**
 * @jsx React.DOM
 */

var Header      = require('../components/header.jsx');
var Row         = require('../components/row.jsx');
var Column      = require('../components/column.jsx');
var List        = require('../components/list.jsx');
var NPM         = require('../models/npm');
var Bower       = require('../models/bower');

var HomeView = React.createClass({
  componentDidMount: function() {
    this.state.npm.on('change', this.forceUpdate.bind(this));
    this.state.bower.on('change', this.forceUpdate.bind(this));
  },

  componentWillMount: function() {
    this.state.npm.fetch();
    this.state.bower.fetch();
  },

  getInitialState: function() {
    return {
      npm:    new NPM(),
      bower:  new Bower()
    };
  },

  render: function() {
    return (
      <div class="home">
        <Header />

        <hr />

        <Row>
          <Column class="npm packages" cols="6">
            <h3><a href="https://npmjs.org/">NPM</a> Packages</h3>

            <List collection={this.state.npm.get('dependencies')} />
          </Column>
          <Column class="bower packages" cols="6">
            <h3><a href="http://bower.io/">Bower</a> Packages</h3>

            <List collection={this.state.bower.get('dependencies')} />
          </Column>
        </Row>
      </div>
    );
  }
});

module.exports = HomeView;
