app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {


    var self = this;



    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function () {
        $scope.breadcrumb = folderBreadcrumbService.getPath();
    }

    $scope.pathChange = function(component){
        folderBreadcrumbService.navigate(component);
        $scope.breadcrumb = folderBreadcrumbService.getPath();
        $scope.getComponent();
    }

    $scope.folderClick = function(component){
        if(component.type === 'folder'){
            $scope.pathChange();
        }
    }

    $scope.runClick = function(component){
        $scope.preview = true;
        $scope.pathChange(component);
    }

    $scope.getComponent = function(component){
        var component = $scope.breadcrumb[$scope.breadcrumb.length-1];
        getFolderService.getComponent(component).then(function(result){
            $scope.activePage = result;
            $scope.$apply();
        })
    }

  


    var root = {
        id: '-1',
        name: 'root',
        type: 'folder'
    }

    getFolderService.setRootFolder(root.id);
    $scope.pathChange(root);
    


   
}])