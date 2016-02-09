loginApp.controller('registerController', function($scope,RegisterService,$location,$rootScope) {
        // create a message to display in our view

        RegisterService.list().success(function(data) {
        	$scope.users=data;
        });
        $scope.form_data={};
        $scope.message = 'api call to be made on click of register';
        $scope.register = function() {
        	//console.log($scope.vm.user);
        	RegisterService.registerUser($scope.form_data).success(function(data) {
        		$scope.notification=data;
//should do these things only on success notification
                if (confirm("User details are registered successfully!  Now press OK to continue") == true) {
                    $rootScope.session = true;
                    $rootScope.noSession = false;
                    $location.path( "/zoozoo" );
                } else {
                 var x = "You pressed Cancel!";
             }
             $rootScope.session = true;
             $rootScope.noSession = false;
             $location.path( "/zoozoo" );
         });
        };

    });