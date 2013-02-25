module.exports = angular.module('app.services', [
  require('./apiService').name,
  require('./githubService').name
]);
