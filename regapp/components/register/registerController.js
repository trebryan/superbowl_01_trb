/**
 * Created by mkahn on 12/4/14.
 */

/**
 *
 * Lookup Screen Controller
 *
 */

app.controller("regController", function($scope, ngToast, $location) {

    console.log("regController be loaded.");

    $scope.model = {pwd1:"", pwd2:"", name:"", email:"", initials:""};

     function validate(){
        if ( !$scope.model.name || !$scope.model.initials ){
             //ngToast.create("Please fill in first and last name!");
            ngToast.create("Please enter name and initials");
            return false;
        }

        var validEmail = RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}").test($scope.model.email);
        if (!validEmail){
            ngToast.create("Please enter a valid email");
            return false;
        }

        if ($scope.model.pwd1=="" || ($scope.model.pwd1 != $scope.model.pwd2) ){
            ngToast.create("Password must match");
            return false;
        }

        return true;
     }

     $scope.createPlayer = function(){

        if(validate()){

            $scope.checkAccountThenAdd($scope.model).then(
                function(msg){
                    ngToast.create("Account Created");
                    $scope.currentPlayer = {
                        name: $scope.model.name,
                        email: $scope.model.email,
                        initials: $scope.model.initials,
                        totalPicks: 0,
                        payNow: 0,
                        playersCells: []
                    }
                    $location.path("/picks")

                },
                function(msg){
                    ngToast.create(msg);
                }

            );

        };

     }


});
