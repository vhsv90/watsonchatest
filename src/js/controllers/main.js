(function () {
    'use strict';
    angular
        .module('watsonDemoApp')
        .controller('MainController', ['$scope', 'PromiseService', MainController]);

    function MainController($scope, PromiseService) {
        var helper = PromiseService;

        $scope.sendMessage = function (conversation) {
            var promise = helper.Post(JSON.stringify(conversation));
            promise.then(function (result) {
                $scope.result = result.data.output.text[0];
            });
        }
    }
})();
