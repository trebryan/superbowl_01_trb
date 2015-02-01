/**
 * Created by mkahn on 2/1/15.
 */


app.directive("scoreBoard", function(){
    return {
        restrict: 'E',
        templateUrl: 'js/scoreboard.partial.html',
        scope: {
            initials: "="
        },
        link: function (scope, element, attrs) {
            // Putting link function here in case we need it.
            console.log("Loading scoreboard");
            scope.initials = scope.initials.slice(0,3);
        }
    }
})
