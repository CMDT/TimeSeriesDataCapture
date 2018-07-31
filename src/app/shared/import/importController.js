app.controller('importController', ['$scope', '$log', '$mdDialog', function ($scope, $log, $mdDialog) {

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/shared/import/importPanel.html',
                parent: angular.element(document.h1),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    function DialogController($scope, $mdDialog) {
        $scope.results = [{
            name : '24/03/2018 11:00:01',
            type: 'folder'
        },
        {
            name : '25/03/2018 12:23:12',
            type: 'run'
        },
        {
            name : '26/03/2018 15:33:21',
            type: 'run'
        },
        {
            name : '27/03/2018 09:00:01',
            type: 'folder'
        }]

        var secondPage = [{
            name : '18/04/2018 13:00:01',
            type: 'run'
        },
        {
            name : '19/04/2018 13:00:01',
            type: 'run'
        }]

        $scope.secondPage = function(){
            $scope.results = secondPage;
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
          };
      
    }


}])