app.controller('homeController', ['$scope', '$log', '$filter', 'authenticationService', 'oneDriveAuthenticationService', 'searchService', function ($scope, $log, $filter, authenticationService, oneDriveAuthenticationService, searchService) {

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
            searchService.tagPrediction($filter('lowercase')(search)).then(function (result) {

                $scope.search = result[0].tag;
                $scope.$apply();
            });


        }

    }

    $scope.searchClick = function () {
        if ($scope.search.length > 0) {
            searchService.searchRequest($scope.search).then(function (result) {
                $scope.results = result;
                $scope.$apply();
                $log.log($scope.results);
            })
        }
    }

  


   



}])