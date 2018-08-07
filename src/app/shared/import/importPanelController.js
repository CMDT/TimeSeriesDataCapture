app.controller('importPanelController', ['$scope', '$log', '$mdDialog', 'getFolderService','folderBreadcrumbService', function ($scope, $log, $mdDialog, getFolderService,folderBreadcrumbService) {


    var self = this;
   
    

    $scope.activePage = [];
    $scope.breadcrumb = [];
    $scope.preview = false;

    self.getBreadCrumb = function(){
        $scope.breadcrumb = folderBreadcrumbService.getPath();
    
    }

    $scope.breadcrumbSelect = function(element){
        self.getComponents(element.name,element.id);
    }

    
    self.getComponents = function (folderName,folderId) {
        getFolderService.getFolder(folderName,folderId).then(function (result) {
            $scope.activePage = result;
            
            $scope.$apply();                                                     
        })
    }

    self.getRun = function(runName,runId){
        $scope.preview = true;
        getFolderService.getRun(runName,runId).then(function(result){
            var r = result.data
            r['Time'] = r['Time'].slice(0,10);
            r['T(Setpoint)'] = r['T(Setpoint)'].slice(0,10);
            r['T(Copper)'] = r['T(Copper)'].slice(0,10);
            r['T(Cell1)'] = r['T(Cell1)'].slice(0,10);
            r['T(Cell2)'] = r['T(Cell2)'].slice(0,10);
            r['T(Environment)'] = r['T(Environment)'].slice(0,10);
            r['DAC'] = r['DAC'].slice(0,10);

            $scope.activePage = r;
        })
    }

    $scope.componentClick = function (component) {
        if (component.type === 'folder') {
            self.getComponents(component.name,component.id);
        }else if(component.type === 'run'){
            self.getRun(component.name,component.id);
        }
    }



    $scope.cancel = function () {
        $mdDialog.cancel();
        folderBreadcrumbService.home();
    };

    $scope.previewChange = function () {
        $scope.preview = !$scope.preview;
       
    }



    self.getComponents();
    self.getBreadCrumb();


}])