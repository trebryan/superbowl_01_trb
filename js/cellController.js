/**
 * Created by treb on 1/8/15.
 */


app.controller("cellController", function($scope, $http) {

    $scope.myModel = {message: ""};
    $scope.realName= "Treb Ryan";
    $scope.emailAdress="trebryan@gmail.com";
    $scope.nickName="The Man!";
    $scope.initials = "RJR";
    $scope.pickFile = [];
    $scope.totalPicks = 0;
    $scope.paidPicks= 0;
    $scope.unpaidPicks=0;
    $scope.pickPrice=10;
    $scope.payNow=0;

    //$http.get('data/picks.json').success(function(data) {
    //    $scope.pickFile = data;
    //    console.log($scope.pickFile.length + " is the length of the pickFile after loading");
    //});

    var promise = $http.get('data/picks.json');

    promise.then( function(payload) {
        $scope.pickFile = payload.data;
    });

    var getCost = function(){
        $scope.unpaidPicks = $scope.totalPicks - $scope.paidPicks;
        $scope.payNow = $scope.unpaidPicks * $scope.pickPrice;
    }


    $scope.load = function(cell) {
        promise.then( function() {
            for (var record in $scope.pickFile) {
                var currentCell = "" + cell.screenRow + cell.screenColumn;
                //console.log(currentCell);
                console.log($scope.pickFile[record].CellID);
                if (currentCell === $scope.pickFile[record].CellID) {
                    cell.initials = $scope.pickFile[record].initials;
                    $scope.totalPicks++;
                    cell.previouslyUnpicked = true;
                }
            }
            getCost();
        })
        };





        var PickCell = function(screenRow, screenColumn){

            this.screenRow = screenRow;
            this.screenColumn = screenColumn;
            this.initials = "";
            this.previouslyUnpicked = true;
            this.currentlyUnpicked = true;

            //this.UnpickedBy = function(initials){
            //    console.log("Unpicked by: "+initials);
            //    this.initials = initials;
            //};
            //
            //this.unPick = function(){
            //    this.intials = undefined;
            //};


        };

        $scope.playingField = new Array(10);

        for (var row=0; row<10; row++){
            $scope.playingField[row] = new Array(10);
            for (var col=0; col<10; col++){
                $scope.playingField[row][col] = new PickCell(row, col);
                //$scope.playingField[row][col].UnpickedBy(""+row+col);
            }
        }

        console.log("Field done");

        $scope.selected = function(cell) {
            console.log(cell.previouslyUnpicked);
            if (cell.previouslyUnpicked) {
                    var cellID = cell.screenRow.toString() + cell.screenColumn.toString();
                console.log(cellID);
                if (cell.currentlyUnpicked) {
                    cell.initials = $scope.initials;
                    $http.post('superbowl_pick.php', {CellID: cellID, initials: cell.initials});
                    $scope.totalPicks++;
                    getCost();
                    cell.currentlyUnpicked = false;
                }
                else {
                    cell.initials = undefined;
                    $http.post('superbowl_unpick.php', {CellID: cellID, initials: cell.initials});
                    $scope.totalPicks--;
                    getCost();
                    cell.currentlyUnpicked = true;
                }

                $scope.myModel.message = "Cell [" + cellID + "] "+cell.currentlyUnpicked;
            }
        }

    });


