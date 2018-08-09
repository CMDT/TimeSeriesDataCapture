app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', 'folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService, folderBreadcrumbService) {

    var self = this;

    var selected = {}

    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;



    var pathChange = function (component) {
        folderBreadcrumbService.navigate(component);
        $scope.breadcrumb = folderBreadcrumbService.getPath();
        getComponent();
    }

    var getComponent = function () {
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


    $scope.folderClick = function (component) {
        if (component.type === 'folder') {
            pathChange(component);
        }
    }

    $scope.previewToggle = function (component) {
        if ($scope.preview) {
            $scope.preview = false;
            pathChange($scope.breadcrumb[$scope.breadcrumb.length - 2]);
        } else {
            $scope.preview = true;
            pathChange(component);
        }
    }

    $scope.selectedToggle = function (runId) {
        if (selected.hasOwnProperty(runId)) {
            delete selected[runId];
        } else {
            selected[runId] = true;
        }

        $log.log(selected);
    }

    $scope.selectedAllToggle = function () {
        var activePageData = $scope.activePage.data;
        if (!$scope.selectedAllIsChecked()) {
            for (var i = 0, n = activePageData.length; i < n; i++) {
                if (activePageData[i].type === 'run') {
                    selected[activePageData[i].id] = true;
                }
            }
        } else {
            for (var i = 0, n = activePageData.length; i < n; i++) {
                delete selected[activePageData[i].id];
            }
        }
    }

    $scope.selectedAllIsChecked = function () {
        if(!($scope.activePage.hasOwnProperty('id'))){
            return false;
        }

        var activePageData = $scope.activePage.data;

        for (var i = 0, n = activePageData.length; i < n; i++) {
            if (activePageData[i].type === 'run' && !(selected.hasOwnProperty(activePageData[i].id))) {
                return false;
            }
        }
        return true;
    }

   

    $scope.exists = function (runId) {
        return selected.hasOwnProperty(runId);
    }

    $scope.cancel = function () {
        $log.log($scope.breadcrumb);
        $mdDialog.cancel();
    }

    $scope.confirm = function () {
        $log.log(selected);
    }

    var root = {
        id: '-1',
        name: 'root',
        type: 'folder'
    }


    var path = localStorage.getItem('path');
    getFolderService.setRootFolder(root.id);
    path = (path) ? JSON.parse(path) : [];
    $log.log(path);
    if (path != null && path.length > 0) {
        for (var i = 0, n = path.length; i < n; i++) {
            $log.log(path[i]);
            pathChange(path[i]);
        }
    } else {
        pathChange(root);
    }






}])