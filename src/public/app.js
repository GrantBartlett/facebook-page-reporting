angular.module('app', [
    'ui.router',
    'ngMessages',
    'ngSanitize',
    'ui.bootstrap',
    'ngSanitize',
    'ng.shims.placeholder',
    'ngFacebook',
    'Core'
]);

angular.module('app').config(configuration)

.run(function ($rootScope) {
    // Load the facebook SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

function configuration($stateProvider, $urlRouterProvider, $locationProvider, $facebookProvider) {
    $stateProvider
        .state('core', {
            url: '/',
            templateUrl: 'modules/core/views/list-core.client.view.html'
        });

    $facebookProvider.setAppId('1522818891365962');
    $urlRouterProvider.otherwise('/');
}



