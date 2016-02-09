loginApp.controller('loginController',['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
      
        $scope.message = 'controller should be in seperate folder!!';
        $scope.session = true;

        $scope.validateSession = function(){
        	$rootScope.session = true;
            $rootScope.noSession = false;
            $location.path( "/contact" );
        }
    }]);