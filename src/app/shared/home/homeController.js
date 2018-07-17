

app.controller('homeController', ['$scope','$log','authenticationService','oneDriveAuthenticationService',function($scope,$log,authenticationService,oneDriveAuthenticationService) {

    $scope.login = function(){
        authenticationService.login();
    }

    $scope.loginOneDrive = function(){
        oneDriveAuthenticationService.login();
    }

}])


