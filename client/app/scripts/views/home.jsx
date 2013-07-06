/**
 * @jsx React.DOM
 */

var Header      = require('../components/header.jsx');
var Row         = require('../components/row.jsx');
var Column      = require('../components/column.jsx');
var List        = require('../components/list.jsx');
var Packages    = require('../models/packages');
var Components  = require('../models/components');

var packages    = new Packages();
var components  = new Components();

var HomeView = React.createClass({
  componentDidMount: function() {
    this.state.packages.on('add remove reset', this.forceUpdate.bind(this));
    this.state.components.on('add remove reset', this.forceUpdate.bind(this));
  },

  componentWillMount: function() {
    this.state.packages.fetch();
    this.state.components.fetch();
  },

  getInitialState: function() {
    return {
      packages:   new Packages(),
      components: new Components()
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

            <List collection={this.state.packages} />
          </Column>
          <Column class="bower packages" cols="6">
            <h3><a href="http://bower.io/">Bower</a> Packages</h3>

            <List collection={this.state.components} />
          </Column>
        </Row>
      </div>
    );
  }
});

module.exports = HomeView;
