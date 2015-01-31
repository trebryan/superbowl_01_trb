/**
 * Created by treb on 1/8/15.
 */


app.controller("cellController", function($scope, $http) {

    console.log("Loading cellController (cell picker)");

    $scope.myModel = {message: ""};

    //MAK moved player to an object because of Angular's issues with simple content types like strings
    //and it's syntactically cleaner.
    $scope.player = {
        realName: "Treb Ryan",
        emailAddress: "trebryan@gmail.com",
        nickName: "The Man!",
        initials: "RJR",
        totalPicks: 0,
        payNow: 0,
        playersCells: []
    }

    $scope.pickFile = [];

    $scope.pickPrice=10;

    //Create an empty playingField. This is populated via the GET below
    $scope.playingField = new Array(10);




    var getCost = function(){
        $scope.unpaidPicks = $scope.totalPicks - $scope.paidPicks;
        $scope.payNow = $scope.unpaidPicks * $scope.pickPrice;
    }

    var PickCell = function(screenRow, screenColumn){

        this.screenRow = screenRow;
        this.screenColumn = screenColumn;
        this.scoreColumn = -1;
        this.scoreRow = -1;
        this.initials = "";
        this.paid = false;

        this.picked = function(){
            if (this.paid){
                //TODO toast message
                console.log("Cannot change a paid cell");
            } else if (this.initials == ""){
                this.initials = $scope.player.initials;
                $scope.player.playersCells.push(this);
            } else if ( this.initials == $scope.player.initials){
                this.initials = ""; //unpick, but only if picked by same user
                var idx = $scope.player.playersCells.indexOf(this);
                if (idx>-1){
                    $scope.player.playersCells.splice(idx,1);//remove that cell
                }

            } else {
                //TODO "Nice try" message
                console.log("Bzzzzz. You can't change someone else's shit, homey");
            }
        }

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
                currentCell.paid = record.paid;

                //Put all the player's cells in a handy array
                if (currentCell.initials==$scope.player.initials){
                    $scope.player.playersCells.push(currentCell);
                }

            });

         });

    }

    function pushFieldToServer(){
        $http.post('superbowl_save_json.php', $scope.playingField).then(
            function(data){
                console.log("Saved field: "+data);
            },
            function(err){
                console.log("Error saving field: "+data);
            }
        );
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

            //A missing file sometimes gives a weird err.status of 0 and not 404.
            //TODO this requires some understanding, though accessing files directly wouldn't be the normal way to do this
            if (err.status=404 || err.status==0){
                //If there's no file, push a blank slate
                pushFieldToServer();
            }
        });

    $scope.getOwed = function(){

        var total=0;

        $scope.player.playersCells.forEach(function(cell){

            if (cell.paid==false){
                total+=$scope.pickPrice;
            }
        });

        return total;

    }

    $scope.applyChanges = function(){
        // You would do the billing, etc here. For now, just save the json out

        pushFieldToServer();

    }

});


