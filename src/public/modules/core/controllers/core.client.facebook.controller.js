'use strict';

// Facebook controller
angular.module('Core').controller('FacebookController', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$FB',
    function ($rootScope, $scope, $state, $stateParams, $http, $FB) {

        $FB.hasLoaded();

        $scope.clickThis = function () {
            $FB.hasLoaded();
        };
    }
]);