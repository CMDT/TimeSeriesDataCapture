app.controller('homeController', ['$scope', '$log', '$filter', 'authenticationService', 'oneDriveAuthenticationService', 'searchPageService', function ($scope, $log, $filter, authenticationService, oneDriveAuthenticationService, searchPageService) {

    $scope.login = function () {
        authenticationService.login();
    }

    $scope.search = ''
    $scope.results = []
    $scope.loginOneDrive = function () {
        oneDriveAuthenticationService.login();
    }

    $scope.inputChange = function (search) {
        if (search.length > 0) {
            searchPageService.tagPrediction($filter('lowercase')(search)).then(function (result) {
                if (result.length > 0) {
                    $scope.search = result[0].tag;
                    $scope.$apply();
                }
            });
        }
    }

    $scope.searchClick = function () {
        if ($scope.search.length > 0) {
            searchPageService.search($scope.search).then(function(result){
                $log.log(result);
            })   
        }
    }

    $scope.dateDecode = function (date) {
        return dtFormatterService.dateDecode(date);
    }

    $scope.timeDecode = function (time) {
        return dtFormatterService.timeDecode(time);
    }














}])