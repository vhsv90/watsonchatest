(function () {
  "use strict";

  angular
    .module('watsonDemoApp')
    .factory('PromiseService', ['$http', '$q', PromiseService]);

  function PromiseService($http, $q) {
    function HttpPost(parameters) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'http://localhost:505/send',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        data: parameters
      }
      $http(req).then(function (data) {
        deferred.resolve(data);
        //deferred.reject(err);
      });
      return deferred.promise;
    }

    return {
      Post: HttpPost
    }
  }
})();