app.controller('importPanelController', ['$scope', '$log', '$mdDialog', '$location', 'getFolderService', 'folderBrowserService', function ($scope, $log, $mdDialog, $location, getFolderService, folderBrowserService) {


    var self = this;

    $scope.activePage;


    $scope.$on('$locationChangeStart', function () {
        event.previewChange();
        $log.log(event);
        
    });



    self.getComponents = function (folderId) {
        getFolderService.getFolder(folderId).then(function (result) {
            $log.log(result);
            $scope.activePage = result;
            $scope.$apply();
        })
    }

    $scope.componentClick = function (component) {
        if (component.type === 'folder') {
            self.getComponents(component.id);
        }
    }



    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.previewChange = function () {
        $scope.preview = !$scope.preview;
    }
    $scope.preview = false;


    self.getComponents();

}])






