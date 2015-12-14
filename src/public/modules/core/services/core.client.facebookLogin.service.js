angular.module('Core')
    .factory('facebookLogin', ['$rootScope', '$q', '$facebook', function ($rootScope, $q, $facebook) {

        return {
            getStatus: function () {
                var deferred = $q.defer();
                $rootScope.loading = true;

                $facebook.getLoginStatus().then(
                    function (response) {
                        if (response.status === 'connected') {
                            deferred.resolve(response);
                            $rootScope.fbReady = true;
                            $rootScope.loading = false;
                        }
                        else {
                            $facebook.login().then(function (response) {
                                // handle the response
                                console.log(response);
                            }, {scope: 'publish_actions, manage_pages, publish_pages, user_photos, read_insights'});
                            deferred.reject('Error occurred, user not logged in');
                        }
                    },
                    function (error) {
                        console.log('error', error);
                        deferred.reject('Error occurred', error);
                    }
                );

                return deferred.promise;
            }
        }
    }]);