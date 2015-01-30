/**
 * Created by treb on 1/8/15.
 */


app.controller("cellControllerMK", function($scope, $http) {

    //MAK: sometimes angular can get wonky using what it thinks are primitive types (i.e. it doesn't know if it is
    //a string or an object, so best practice is to always use an object like $scope.myModel.message.
    $scope.myModel = {message: ""};
    //MAK: But this can cause issues, especially with child-controllers
    $scope.initials = "RJR";
    //MAK: but this is fine, since it is an Array object
    $scope.pickFile = [];

    //MAK: moved this up here since I like to have all my initialization and defines up front
    $scope.playingField = new Array(10);

    //MAK: populate an empty 2D array.
    for (var row=0; row<10; row++){
        $scope.playingField[row] = new Array(10);
        for (var col=0; col<10; col++){
            $scope.playingField[row][col] = new PickCell(row, col);
            //$scope.playingField[row][col].pickedBy(""+row+col);
        }
    }

    //MAK: This function reloads the json and populates the model. It doesn't necessarily need to
    //be on the $scope object, but no harm in doing so.
    $scope.refreshPicks = function(){

        //MAK: I am formatting it this way to make it easier to read
        $http.get('data/picks.json')
            .success(
                function(data) {
                    $scope.pickFile = data;
                    //console.log($scope.pickFile.length +"idiot");
                    //
                    //MAK: for..in is *not* something you will use regularly. It is meant to iterate
                    //over keys in an object in an *arbitrary* order. For arrays, order matters, so you
                    //would normally use array.forEach() or a normal for loop.
                    //
                    //Also, you have not user "var record" so you just created a global variable and it could
                    //conflict with all variables named "record" anywhere in any module. Never, ever do this, homes.
                    //
                    //for (record in $scope.pickFile){
                    $scope.pickFile.forEach(function(record){




                    })
                currentCell = ""+cell.screenRow+cell.screenColumn;
                //console.log(currentCell);
                //console.log($scope.pickFile[record].CellID);
                if (currentCell === $scope.pickFile[record].CellID) {
                    cell.initials = $scope.pickFile[record].initials;
                    cell.unPicked = false;
                }
            }
        });


    }

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

    //MAK keep yo indentation consistent, beatch
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


