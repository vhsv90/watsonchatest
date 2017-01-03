(function () {
  "use strict";

  angular
    .module('watsonDemoApp')
    .factory('PromiseService', ['$http', '$q', '$location', PromiseService]);

  function PromiseService($http, $q, $location) {
    function HttpPost(parameters) {
      var deferred = $q.defer();
      var api_url = $location.protocol() + '://' + $location.host() + ':505/send';
      var req = {
        method: 'POST',
        url: api_url,
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