'use strict';

// Facebook controller
angular.module('Core').controller('FacebookController', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$FB',
    function ($rootScope, $scope, $state, $stateParams, $http, $FB) {

        // @TODO: Find way of getting promise from SDK without clicking button
        // Then have a callback for checking sdk is ready and available

        $scope.auth = function () {
            $FB.hasLoaded().then(function (response) {
                if (response.status === 'connected') {
                    $scope.SDKReady = true;
                    $scope.user = response;
                }
            });
        };

        $scope.getInsights = function () {
            if ($scope.SDKReady) {

                // Allow frontend selection of specific stats
                var type = $scope.response.insightType;
                var page = $scope.response.brand;
                var url = "/" + page + "/" + "insights/" + type;

                // Experimenting what stats we can get
                FB.api(
                    url,
                    function (data) {
                        if (data && !data.error) {

                            $scope.response = data;
                            $scope.$apply();
                        }
                    }
                );

            } else {
                alert('Please auth first');
            }
        }

    }
]);