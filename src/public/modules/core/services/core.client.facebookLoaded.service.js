angular.module('Core')
    .factory('$FB', ['$rootScope', '$q', function ($rootScope, $q) {
        return {
            hasLoaded: function () {
                var deferred = $q.defer();

                if (window.FB) {
                    FB.init();
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'connected') {
                            console.log(response, 'success');
                            deferred.resolve(response);
                        }
                        else {
                            console.log(response, 'error');
                            deferred.reject('Error occured, user not logged in');
                            FB.login();
                        }
                    });

                    return deferred.promise;
                }
            }
        }
    }]);


