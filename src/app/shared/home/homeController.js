app.controller('homeController', ['$scope', '$log', '$filter', 'authenticationService', 'oneDriveAuthenticationService', 'searchService', 'dtFormatterService', function ($scope, $log, $filter, authenticationService, oneDriveAuthenticationService, searchService, dtFormatterService) {

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
                if (result.length > 0) {
                    $scope.search = result[0].tag;
                    $scope.$apply();
                }
            });
        }
    }

    $scope.searchClick = function () {
        if ($scope.search.length > 0) {
          
            var queryObject = searchService.searchExtract($scope.search);
            var date = null;
            if(queryObject.hasOwnProperty('date')){
                date = dtFormatterService.dateEncode(queryObject.date[0]);
            }
            var time=null;
            if(queryObject.hasOwnProperty('time')){
                time = dtFormatterService.timeEncode(queryObject.time[0]);
            }
            var tags = null;
            if(queryObject.hasOwnProperty('tag')){
                searchService.tagParse(queryObject.tag)
                .then(function(result){
                    tags = result;
                })
                
            }
            searchService.searchRequest(tags,date,time)
            .then(function(result){
                $log.log(result);
            });
        }
    }

    $scope.dateDecode = function (date) {
        return dtFormatterService.dateDecode(date);
    }

    $scope.timeDecode = function (time) {
        return dtFormatterService.timeDecode(time);
    }














}])