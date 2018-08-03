app.controller('importPanelController', ['$scope', '$rootScope', '$log', '$mdDialog', '$location', '$transitions', function ($scope, $rootScope, $log, $mdDialog, $location, $transitions) {


    $scope.$on('$locationChangeStart', function () {
        $rootScope.actualLocation = $location.path();
        history.forward();
        event.preventDefault();
       
        $scope.pointer = $scope.pointer - 1;
        activePage();
        $log.log('hit');
    });

   

  
   
    $scope.firstPage = [{
        name: '24/03/2018 11:00:01',
        type: 'folder'
    },
    {
        name: '25/03/2018 12:23:12',
        type: 'run'
    },
    {
        name: '26/03/2018 15:33:21',
        type: 'run'
    },
    {
        name: '27/03/2018 09:00:01',
        type: 'folder'
    }]

    $scope.secondPage = [{
        name: '18/04/2018 13:00:01',
        type: 'run'
    },
    {
        name: '19/04/2018 13:00:01',
        type: 'run'
    }]

    $scope.pages = [$scope.firstPage,$scope.secondPage];
    $scope.pointer = 0;
    
   
    function activePage(){
        $log.log($scope.pages[$scope.pointer]);
        $scope.activePage = $scope.pages[$scope.pointer];
    }
    activePage();


    $scope.changePage = function () {
        var pointer  = $scope.pointer + 1 ;
        if(!(pointer >= $scope.pages.length)){
            $scope.pointer = pointer;
            activePage();
        }
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.previewChange = function () {
        $scope.preview = !$scope.preview;
    }
    $scope.preview = true;



}])






