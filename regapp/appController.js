/**
 * Created by mkahn on 1/31/15.
 */

app.controller("appController", function($scope, $http, ngToast, $location) {

    console.log("Loading appController (main parent controller)");

    $scope.playerAccounts = [];
    $scope.currentPlayer = { email: "", pwd: ""};


    function loginCheck() {

        //TODO lodash iterate playerAccounts
        return false;

    }

    function pushPlayersToServer(){
        $http.post('superbowl_save_players.php', $scope.playerAccounts).then(
            function(data){
                console.log("Saved players: "+data);
            },
            function(err){
                console.log("Error saving players: "+data);
            }
        );
    }

    $http.get('data/players.json').then(
        function(payload) {
            $scope.playerAccounts = payload.data;
        },
        function(err){
            //TODO implement either ngToast or similar to issue error message
            console.log("Error getting players.json!");
            console.log(err);

            //A missing file sometimes gives a weird err.status of 0 and not 404.
            //TODO this requires some understanding, though accessing files directly wouldn't be the normal way to do this
            if (err.status=404 || err.status==0){
                //If there's no file, push a blank slate
                pushPlayersToServer();
            }
        });


    $scope.login = function(){

        console.log("User loggin in.");

        if (!$scope.currentPlayer.email && !$scope.currentPlayer.pwd){
            ngToast.create("Try putting in a username and password, genious!");
        } else {
            if (loginCheck()){
                //TODO go to picks
            } else {
                ngToast.create("Login check not implemented yet");
            }
        }
    }

    $scope.createAccount = function(){

        console.log("Creating account...");
        $location.path("/register");

    }

});
