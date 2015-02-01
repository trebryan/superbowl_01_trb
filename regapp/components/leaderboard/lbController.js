/**
 * Created by treb on 1/8/15.
 */


app.controller("lbController", function($scope, $http, ngToast, $location) {

    console.log("Loading lbController (leaderboard)");

    //Create an empty playingField. This is populated via the GET below
    $scope.playingField = new Array(10);


    //A truncated version of the full thing
    var PickCell = function(screenRow, screenColumn){

        this.screenRow = screenRow;
        this.screenColumn = screenColumn;
        this.scoreColumn = -1;
        this.scoreRow = -1;
        this.initials = "";

    };

    for (var row=0; row<10; row++){
        $scope.playingField[row] = new Array(10);
        for (var col=0; col<10; col++){
            $scope.playingField[row][col] = new PickCell(row, col);
        }
    }

    // Digest the data returned and setup playingField to match
    function processPickFile(){

        $scope.pickFile.forEach(function(line){

            line.forEach(function(record){

                var row = record.screenRow;
                var col = record.screenColumn;

                //Select the right visual cell from the array of playingField
                var currentCell = $scope.playingField[row][col];

                //Fill it with the saved data
                currentCell.initials = record.initials || "";

            });

         });

    }


    $http.get('data/picksfield.json').then(
        function(payload) {
            $scope.pickFile = payload.data;
            processPickFile();
        },
        function(err){
            //TODO implement either ngToast or similar to issue error message
            console.log("Error getting picks.json!");
            console.log(err);

        });



});


