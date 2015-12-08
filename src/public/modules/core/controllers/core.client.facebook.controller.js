'use strict';

// Facebook controller
angular.module('Core').controller('FacebookController', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$facebook',
    function ($rootScope, $scope, $state, $stateParams, $http, $facebook) {

        $rootScope.loading = true;

        $facebook.getLoginStatus().then(
            function (response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');
                }
                else {
                    FB.login();
                }
            },
            function (error) {
                console.log('error', error);
            }
        );

        $facebook.api("/me").then(
            function (response) {
                $rootScope.fbReady = true;
                $rootScope.loading = false;
                $rootScope.user = response;
            },
            function (err) {
                console.log(err);
                $rootScope.loading = false;
                $rootScope.fbReady = false;
            });

        $scope.byId = function () {
            if ($rootScope.fbReady) {
                var page = $scope.response.brand;
                var url = "/" + page + "/" + "feed";

                $facebook.api(
                    url,
                    function (response) {
                        if (response && !response.error) {
                            /* handle the result */
                            console.log(response);
                        } else {
                            console.log(response);
                            console.log('err');
                        }
                    }
                );
            }
        };

        $scope.getInsights = function () {
            if ($rootScope.fbReady) {

                // Page to generate insights for

                var page = $scope.response.brand;
                var url = "/" + page + "/" + "insights/";


                // Experimenting what stats we can get
                $facebook.api(url).then(
                    function (response) {
                        $scope.response = response;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }
        }
    }
]);