/**
 * Created by treb on 1/8/15.
 */


app.controller("cellController", function($scope, $http) {

    $scope.myModel = {message: ""};
    $scope.initials = "RJR";
    $scope.pickFile = [];

    $scope.load = function(cell) {
        $http.get('data/picks.json').success(function(data) {
            $scope.pickFile = data;
            //console.log($scope.pickFile.length +"idiot");
            for (record in $scope.pickFile){
                currentCell = ""+cell.screenRow+cell.screenColumn;
                //console.log(currentCell);
                //console.log($scope.pickFile[record].CellID);
                if (currentCell === $scope.pickFile[record].CellID) {
                    cell.initials = $scope.pickFile[record].initials;
                    cell.unPicked = false;
                }
            }
        });
    };



        var PickCell = function(screenRow, screenColumn){

            this.screenRow = screenRow;
            this.screenColumn = screenColumn;
            this.initials = "";
            this.unPicked = true;

            this.pickedBy = function(initials){
                console.log("Picked by: "+initials);
                this.initials = initials;
            }

            this.unPick = function(){
                this.intials = undefined;
            }


        }

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
                var cellID = cell.screenRow.toString() + cell.screenColumn.toString()
                console.log(cellID);
                if (cell.initials !== "") {
                    cell.initials = "";
                    $http.post('superbowl_unpick.php', {CellID: cellID, initials: cell.initials});
                }
                else {
                    cell.initials = $scope.initials;
                    $http.post('superbowl_pick.php', {CellID: cellID, initials: cell.initials});
                }
                ;
                console.log(cell);

                $scope.myModel.message = "Cell clicked [" + cellID + "]";
            }
        }




        /*
        $http.get('data/picks.json').success(function (data) {
            $scope.pickFile = data;
        }),

        $scope.load = function (x,y,cell) {
            $scope.cellVal = $scope.rows[x] + "" + $scope.columns[y];
            $scope.cellContents = $scope.initials;
            console.log($scope.cellVal);
            var cellMitch = {};
            cellMitch[$scope.cellVal] = true;
            $scope.cellTaken.push(cellMitch);
            console.log($scope.cellTaken[parseInt($scope.cellVal)]);
        },

        $scope.pickCell = function (x, y) {
           // if($scope.pickFile.initials = "") {
                console.log("Open");
                $http.post('superbowl_pick.php',{CellID : $scope.cellVal, initials : $scope.initials});
                console.log($scope.cellVal);
                $scope.cellContents = $scope.initials;
                document.getElementById($scope.cellVal).innerHTML=$scope.cellContents;
           // } else{
           //     console.log('taken');
           // };

        }

        //console.log($scope.cellVal);
        */

    });


