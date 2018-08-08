app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {


    var self = this;



    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function () {
        $scope.breadcrumb = folderBreadcrumbService.getPath();
    }

    $scope.pathChange = function (component) {
        folderBreadcrumbService.navigate(component);
        $scope.breadcrumb = folderBreadcrumbService.getPath();
        $scope.getComponent();
    }

    $scope.folderClick = function (component) {
        if (component.type === 'folder') {
            $scope.pathChange();
        }
    }

    $scope.getComponent = function () {
        var component = $scope.breadcrumb[$scope.breadcrumb.length - 1];
        getFolderService.getComponent(component).then(function (result) {

            if (component.type === 'run') {
                var r = result.data
                r['Time'] = r['Time'].slice(0, 10);
                r['Setpoint'] = r['T(Setpoint)'].slice(0, 10);
                r['Copper'] = r['T(Copper)'].slice(0, 10);
                r['Cell1'] = r['T(Cell1)'].slice(0, 10);
                r['Environment'] = r['T(Environment)'].slice(0, 10);
                r['DAC'] = r['DAC'].slice(0, 10);
                result.data = r;
            }

            $scope.activePage = result;
            $scope.$apply();
        })
    }

    $scope.previewToggle = function(component){
        if($scope.preview){
            $scope.preview = false;
            $scope.pathChange($scope.breadcrumb[$scope.breadcrumb.length-2]);
        }else{
            $scope.preview = true;
            $scope.pathChange(component);
        }
    }

    $scope.cancel = function(){
        $mdDialog.cancel();
    }

    var root = {
        id: '-1',
        name: 'root',
        type: 'folder'
    }

    getFolderService.setRootFolder(root.id);
    $scope.pathChange(root);




}])