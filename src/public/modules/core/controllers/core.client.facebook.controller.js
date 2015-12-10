'use strict';

// Facebook controller
angular.module('Core').controller('FacebookController', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$facebook', 'facebookLogin',
    function ($rootScope, $scope, $state, $stateParams, $http, $facebook, facebookLogin) {

        // Check Facebook Login Service and auth
        facebookLogin.getStatus()
            .then(function (response) {
                if (response.status === 'connected') {

                    $facebook.api("/me").then(
                        function (response) {
                            $rootScope.user = response;
                        }
                    );
                }
            });
    }
]);