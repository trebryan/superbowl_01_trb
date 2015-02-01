//Define the routes for our app


app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/register', {
            templateUrl: 'regapp/components/register/register.partial.html',
            controller: 'regController'
        })

        .when('/picks', {
            templateUrl: 'regapp/components/picker/picker.partial.html',
            controller: 'cellController'
        })

        .when('/landing', {
            templateUrl: 'regapp/components/landing/landing.partial.html'
            //controller: 'cellController'
        })

        .when('/admin', {
            templateUrl: 'regapp/components/admin/admin.partial.html'
            //controller: 'cellController'
        })

        .when('/leaderboard', {
            templateUrl: 'regapp/components/leaderboard/lb.partial.html',
            controller: 'lbController'
        })

        .otherwise({
            redirectTo: '/landing'
        });

});





