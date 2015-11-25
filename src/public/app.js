angular.module('app', [
    'ui.router',
    'ngMessages',
    'ngSanitize',
    'ui.bootstrap',
    'ngSanitize',
    'ng.shims.placeholder',
    'Core'
]);

angular.module('app').config(configuration);

function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('core', {
            url: '/',
            templateUrl: 'modules/core/views/list-core.client.view.html'
        });

    $urlRouterProvider.otherwise('/');
}