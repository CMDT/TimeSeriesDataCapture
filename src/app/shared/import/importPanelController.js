app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {


    var self = this;



    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function () {
        $scope.breadcrumb = folderBreadcrumbService.getPath();
    }

    $scope.breadcrumbSelect = function (folder) {
        self.getComponents(folder);
    }


    self.getComponents = function (folder) {
        $log.log(folder);
        getFolderService.getFolder(folder, $scope.activePage.parent).then(function (result) {
            $scope.activePage = result;
            $scope.$apply();
        })

    }

    self.getRun = function (run) {

        getFolderService.getRun(run).then(function (result) {
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
            self.getComponents(component);
        }
    }

    $scope.runClick = function (component) {

        if ($scope.preview) {
            $scope.preview = false;
            getFolderService.up().then(function (result) {
                $scope.activePage = result;
                $scope.$apply();
            })
        } else {
            self.getRun(component);
            $scope.preview = true;
        }

    }


    $scope.cancel = function () {
        $mdDialog.cancel();
        getFolderService.clearCache();
    };



    self.getRootFolder = function () {
        getFolderService.getFolder({ name: 'root' }).then(function (result) {
            $scope.activePage = result;
            getFolderService.setRootFolder(result.id);
            $scope.$apply();
        })
    }


    self.getRootFolder();
    self.getBreadCrumb();


}])