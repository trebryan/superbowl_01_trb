/**
 * Created by mkahn on 1/31/15.
 */

app.controller("appController", function($scope, $http, ngToast, $location, $q) {

    console.log("Loading appController (main parent controller)");

    $scope.playerAccounts = [];
    $scope.currentPlayer = { email: "", pwd: "", playersCells: []};
    $scope.model = { loginFail: false };
    $scope.settings = { locked: false, columns: [], rows:[] };


    function pushSettingsToServer(){
        $http.post('superbowl_save_settings.php', $scope.settings).then(
            function(data){
                console.log("Saved settings: "+data);
            },
            function(err){
                console.log("Error saving settings: "+data);
            }
        );
    }

    $http.get('data/settings.json').then(
        function(payload) {
            $scope.settings = payload.data;
        },
        function(err) {
            //TODO implement either ngToast or similar to issue error message
            console.log("Error getting settings.json!");
            console.log(err);
            //A missing file sometimes gives a weird err.status of 0 and not 404.
            //TODO this requires some understanding, though accessing files directly wouldn't be the normal way to do this
            if (err.status = 404 || err.status == 0) {
                //If there's no file, push a blank slate
                pushSettingsToServer();
            }
        });

    function loginCheck() {

        if ($scope.currentPlayer.email=="adm1n"){
            $location.path('/admin');
        } else if ($scope.settings.locked){
            ngToast.create("Sorry, game is locked! Have a beer!");
        }

        else {

            var user = _.find($scope.playerAccounts, function(p) { return (p.email == $scope.currentPlayer.email); });
            if (user){
            if ( user.pwd1==$scope.currentPlayer.pwd){
                $scope.currentPlayer.name = user.name;
                $scope.currentPlayer.initials = user.initials;
                $location.path('/picks');
            }

        } else {
            $scope.model.loginFail = true;
        }

        }



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

    function getPlayers(){

        var d = $q.defer();

        $http.get('data/players.json').then(
            function(payload) {
                $scope.playerAccounts = payload.data;
                d.resolve();
            },
            function(err){
                //TODO implement either ngToast or similar to issue error message
                console.log("Error getting players.json!");
                console.log(err);
                d.reject(); //normally would pass why, but we're in a hurry...

                //A missing file sometimes gives a weird err.status of 0 and not 404.
                //TODO this requires some understanding, though accessing files directly wouldn't be the normal way to do this
                if (err.status=404 || err.status==0){
                    //If there's no file, push a blank slate
                    pushPlayersToServer();
                    d.resolve();
                }
        });

        return d.promise;
    }


    $scope.login = function(){

        loginCheck();

    }

    $scope.createAccount = function(){

        console.log("Creating account...");
        $location.path("/register");

    }

    $scope.addPlayer = function(userModel){

        $scope.playerAccounts.push(userModel);
        pushPlayersToServer();
    }

    $scope.checkAccountThenAdd = function(userModel){

        var d = $q.defer();

        getPlayers().then(
            function(){
                //look to see if account exists
                var exists = _.some($scope.playerAccounts, { 'email': userModel.email });
                if (exists){
                    d.reject("Account exists!");
                    return;
                }

                var badInitials = _.some($scope.playerAccounts, { 'initials': userModel.initials});
                if (badInitials){
                    d.reject("Those initials are taken, try again.");
                    return;
                }

                $scope.addPlayer(userModel);
                d.resolve();


            },
            function(){
                ngToast.create("An unrecoverable error occurred checking player accounts.");
                d.reject("Network error!")
            }

        );

        return d.promise;

    }

    $scope.toggleLock = function(){

        $scope.settings.locked = !$scope.settings.locked;
        pushSettingsToServer();

    }

    $scope.assignRowsColumns = function(){

        //At this point I realize I should have made the game model a service, but it is 10PM on Saturday, so...fuck it.
            $http.get('data/picksfield.json').then(
                function(payload) {
                    var pickFile = payload.data;
                    var rows = _.shuffle([0,1,2,3,4,5,6,7,8,9]);
                    var cols = _.shuffle([0,1,2,3,4,5,6,7,8,9]);
                    $scope.settings.rows = rows.slice(0); //makes a full copy
                    $scope.settings.columns = cols.slice(0);
                    pushSettingsToServer();

                    var r, c;

                    pickFile.forEach(function(line) {
                        c = cols.pop();
                        line.forEach(function (record) {
                            r = rows.pop();
                            record.scoreRow = r;
                            record.scoreColumn = c;
                            console.log(record);
                        });
                    });

                    $http.post('superbowl_save_json.php', pickFile).then(
                        function(data){
                            console.log("Saved pickfile: "+data);
                            ngToast.create("Square scores assigned!");
                        },
                        function(err){
                            console.log("Error saving pickfile: "+data);
                    }
        );

                },
                 function(err){
                    console.log("Error getting picksfield.json!");
                    console.log(err);
                    ngToast.create("Couldn't get picksfield.json");

                });



    }

    $scope.leaderboard = function(){
        $location.path('/leaderboard');
    }

    getPlayers();

});
