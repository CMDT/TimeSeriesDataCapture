app.controller('homeController', ['$scope', '$log', '$filter', 'authenticationService', 'oneDriveAuthenticationService', 'searchService', function ($scope, $log, $filter, authenticationService, oneDriveAuthenticationService, searchService) {

    $scope.login = function () {
        authenticationService.login();
    }

    $scope.search = ''
    $scope.searchResult = 'sss'
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
            searchService.searchRequest().then(function (result) {
                $scope.searchResult = result;
                $scope.$apply();
            })
        }
    }

    $scope.results = [{
        id: 3463274,
        time: 11324,
        date : '213/213/213',
    },
    {
        id: 3463274,
        time: 11324,
        date : '213/213/213',
    }]



    $scope.autoTextChange = function(){
        $log.log('text changed');
    }

    $scope.autoItemChange = function(item){
        $log.log($scope.selectedItem);
    }

    $scope.autoItems = ['tag1','tag2','tag3'];



}])