/**
 * Created by treb on 1/8/15.
 */


app.controller("cellController", function($scope, $http) {

    $scope.myModel = {message: ""};
    $scope.initials = "RJR";
    $scope.pickFile = [];

    //$http.get('data/picks.json').success(function(data) {
    //    $scope.pickFile = data;
    //    console.log($scope.pickFile.length + " is the length of the pickFile after loading");
    //});

    var promise = $http.get('data/picks.json');

    promise.then( function(payload) {
        $scope.pickFile = payload.data;
        console.log($scope.pickFile.length + " is the length of the pickFile after loading");
    });




    $scope.load = function(cell) {
        promise.then( function() {
            console.log($scope.pickFile.length + " is the length of the pickFile while the Field is being created");
            for (var record in $scope.pickFile) {
                var currentCell = "" + cell.screenRow + cell.screenColumn;
                //console.log(currentCell);
                console.log($scope.pickFile[record].CellID);
                if (currentCell === $scope.pickFile[record].CellID) {
                    cell.initials = $scope.pickFile[record].initials;
                    cell.unPicked = false;
                }
            }
        })
        };





        var PickCell = function(screenRow, screenColumn){

            this.screenRow = screenRow;
            this.screenColumn = screenColumn;
            this.initials = "";
            this.unPicked = true;

            //this.pickedBy = function(initials){
            //    console.log("Picked by: "+initials);
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
                //$scope.playingField[row][col].pickedBy(""+row+col);
            }
        }

        console.log("Field done");

        $scope.selected = function(cell) {
            console.log(cell.unPicked);
            if (cell.unPicked) {
                console.log(cell);
                var cellID = cell.screenRow.toString() + cell.screenColumn.toString();
                console.log(cellID);
                if (cell.initials !== "") {
                    cell.initials = undefined;
                    $http.post('superbowl_unpick.php', {CellID: cellID, initials: cell.initials});
                }
                else {
                    cell.initials = $scope.initials;
                    $http.post('superbowl_pick.php', {CellID: cellID, initials: cell.initials});
                }
                console.log(cell);

                $scope.myModel.message = "Cell clicked [" + cellID + "]";
            }
        }

    });


