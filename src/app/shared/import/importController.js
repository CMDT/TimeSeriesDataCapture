app.controller('importController', ['$scope', '$log', '$mdDialog', function ($scope, $log, $mdDialog) {

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
                
                templateUrl: 'app/shared/import/importPanel.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
              
            })
            
    }

    

   

}])