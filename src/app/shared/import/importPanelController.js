app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {


    var self = this;



    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function () {
        $scope.breadcrumb = folderBreadcrumbService.getPath();
    }

    $scope.pathChange = function(component){
        $log.log(component);
        folderBreadcrumbService.navigate(component);
        $scope.breadcrumb = folderBreadcrumbService.getPath();
        $scope.getComponent($scope.breadcrumb[$scope.breadcrumb.length-1]);
    }

    $scope.getComponent = function(component){
    
    }

  


    var root = {
        id: '-1',
        name: 'root',
        type: 'folder'
    }

    getFolderService.setRootFolder(root.id);
    $scope.pathChange(root);
    


   
}])