app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {


    var self = this;



    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function () {
        $scope.breadcrumb = folderBreadcrumbService.getPath();

    }

    $scope.breadcrumbSelect = function (element) {
        self.getComponents(element.name, element.id);
    }


    self.getComponents = function (folderName, folderId) {
        getFolderService.getFolder(folderName, folderId).then(function (result) {
            $scope.activePage = result;
            $scope.$apply();
        })
    }

    self.getRun = function (runName, runId) {
        
        getFolderService.getRun(runName, runId).then(function (result) {
            $log.log(result);
            var r = result.data
            r['Time'] = r['Time'].slice(0, 10);
            r['Setpoint'] = r['T(Setpoint)'].slice(0, 10);
            r['Copper'] = r['T(Copper)'].slice(0, 10);
            r['Cell1'] = r['T(Cell1)'].slice(0, 10);
            r['Environment'] = r['T(Environment)'].slice(0, 10);
            r['DAC'] = r['DAC'].slice(0, 10);
            result.data = r;
            if ($scope.preview) {
                $scope.activePage = result;
                $log.log(result);
                $scope.$apply();
            }
        })
    }

    $scope.componentClick = function (component) {
        if (component.type === 'folder') {
            self.getComponents(component.name, component.id);
        } 
    }



    $scope.cancel = function () {
        $mdDialog.cancel();
        getFolderService.clearCache();
    };

    $scope.previewChange = function(component) {
        
        if ($scope.preview) {
            $scope.preview = false;
            self.getComponents(undefined, $scope.activePage.parent);
        }else{
            $scope.preview = true;
            self.getRun(component.name, component.id);
        }
        $log.log('preview-change : ' + $scope.preview);
        //$scope.preview = !$scope.preview;

    }



    self.getComponents();
    self.getBreadCrumb();


}])