/**
 * Created by mkahn on 1/31/15.
 */

app.controller("optvAppController", function($scope, $http,$location, $q) {

    console.log("Loading appController (main parent controller)");

    $scope.leader = { initials: "BUBBAGYTEWR"};

    function getCurrentLeader(){

        $http.get('superbowl_getwinner_optv.php').then(
            function(data){
                $scope.leader.initials = data.data.winner;
            },
            function(err){

            }
        )

    };

    getCurrentLeader();

});
