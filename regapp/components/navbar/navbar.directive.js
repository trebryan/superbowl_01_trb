/**
 * Created by mkahn on 1/31/15.
 */

app.directive("navBar", function(){
    return {
        restrict: 'E',
        templateUrl: 'regapp/components/navbar/navbar.partial.html',
        scope: {
            player: "="
        },
        link: function (scope, element, attrs) {
            // Putting link function here in case we need it.
            console.log("Loading navbar");
        }
    }
})
