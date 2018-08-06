app.controller('importController', ['$scope', '$log', '$mdDialog','getFolderService', function ($scope, $log, $mdDialog,getFolderService) {

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
                
                templateUrl: 'app/shared/import/importPanel.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
              
            })
            
    }

    $scope.test = function(){
        getFolderService.getFolder().then(function(result){
            $log.log(result);
        }).catch(function(error){
            $log.error(error);
        });
    }

    

   

}])