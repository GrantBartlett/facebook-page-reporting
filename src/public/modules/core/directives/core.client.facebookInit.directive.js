angular.module('Core').directive('fb', ['$FB', function ($FB) {
    return {
        restrict: "E",
        replace: true,
        template: "<div id='fb-root'></div>",
        compile: function (tElem, tAttrs) {
            return {
                post: function (scope, iElem, iAttrs, controller) {
                    var fbAppId = iAttrs.appId || '';

                    var params = {
                        appId: iAttrs.appId || '',
                        cookie: iAttrs.cookie || true,
                        status: iAttrs.status || true,
                        xfbml: iAttrs.xfbml || true
                    };

                    // Setup the post-load callback
                    window.fbAsyncInit = function () {
                        if (window.FB) {
                            // Initialise FB SDK
                            window.FB.init(params);
                        }
                    };


                }
            }
        }
    };
}]);