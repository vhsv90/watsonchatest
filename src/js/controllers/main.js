(function () {
    'use strict';
    angular
        .module('watsonDemoApp')
        .controller('MainController', ['$scope', 'PromiseService', MainController]);

    function MainController($scope, PromiseService) {
        var helper = PromiseService;
        $scope.dialog = [];

        $scope.sendMessage = function (conversation) {
            var promise = helper.Post(JSON.stringify(conversation));
            promise.then(function (result) {
                $scope.conversation.id = result.data.context.conversation_id;
                $scope.conversation.result = result.data.output.text[0];
                $scope.dialog.push(conversation);
            });
        }
    }
})();
