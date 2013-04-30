angular
  .module("app")
  .factory("apiService", [
    "$http",
    ($http) -> {
      client: $http.get("/api/bower"),
      server: $http.get("/api/package")
    }
  ])
