app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService', '$window', '$location', function ($scope, $log, $mdDialog, getFolderService, $window, $location) {


    var self = this;

    $scope.selected = {

    }

    $scope.activePage = {
        data: []
    }

    $scope.activePage.data = [{
        name: 20180422,
        type: 'run'
    }, {
        name: 20180421,
        type: 'run'
    }, {
        name: 'Documents',
        type: 'folder'
    }, {
        name: 'Runs',
        type: 'folder'
    }];

    $scope.select = function (id) {
        if ($scope.selected.hasOwnProperty(id)) {
            delete $scope.selected[id];
        } else {
            $scope.selected[id] = true;
        }

        $log.log($scope.selected);
    }


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
        //$scope.preview = !$scope.preview;
        $log.log($scope.selected);
    }
    $scope.preview = false;


    //self.getComponents();

}])