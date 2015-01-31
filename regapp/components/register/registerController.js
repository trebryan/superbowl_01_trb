/**
 * Created by mkahn on 12/4/14.
 */

/**
 *
 * Lookup Screen Controller
 *
 */

app.controller("regController", function($scope, ngToast, $q, fortune, $timeout, $location) {

    console.log("regController be loaded.");

    $scope.model = {firstName: "", lastName:"", email:""};

    function validate(){
        if ( !$scope.model.firstName || !$scope.model.lastName ){
        ngToast.create("Player must fill in first and last name!");
        return false;
        }



        return true;
    }

    function createGuest(){

        var d = $q.defer();

        var localEmail = $scope.model.email;
        if (!localEmail){
            localEmail = "no-email-given@test.com";
        }

        fortune.createResources("guests", [ { firstName: $scope.model.firstName,
            lastName: $scope.model.lastName, email: localEmail, eventId: fortune.settings.eventId } ])

        .then(
            function(data){
                ngToast.create("Player Registered");
                var guest = data.data.guests[0];
                d.resolve(guest.id);
            },
            function(err){
                ngToast.create("Registration failed!");
                d.reject();

            });

        return d.promise;

    }

    function queueGuest(guestId){

        var d = $q.defer();

        var payload = [];
        payload.push({ queueName: "chick-fil-a", guestId: guestId });


        fortune.createResources('queues', payload).then(
            function(data){
                ngToast.create("Player Queued");
                $timeout(function(){
                    $location.path("/");
                }, 2000);
                d.resolve();
            },
            function(err){
                ngToast.create("Failed to Queue Player!");
                console.log(err);
                d.reject();
            }
        )

        return d.promise;

    }


    $scope.createPlayer = function(){


        if (validate()){

            createGuest().then(
            function(guestId){

                queueGuest(guestId).then(
                    function(data){
                        $timeout(function(){
                            $location.path("/");
                         }, 2000);

                    }
                );

            });

        }
    };

});
