app.controller('importPanelController', ['$scope','$rootScope', '$log', '$mdDialog','$location','$transitions', function ($scope,$rootScope, $log, $mdDialog,$location,$transitions) {


    $scope.$on('$locationChangeStart', function () {
        $rootScope.actualLocation = $location.path();
        console.log(event);
        event.preventDefault();
        history.forward();
      });
        $scope.results = [{
            name : '24/03/2018 11:00:01',
            type: 'folder'
        },
        {
            name : '25/03/2018 12:23:12',
            type: 'run'
        },
        {
            name : '26/03/2018 15:33:21',
            type: 'run'
        },
        {
            name : '27/03/2018 09:00:01',
            type: 'folder'
        }]

        var secondPage = [{
            name : '18/04/2018 13:00:01',
            type: 'run'
        },
        {
            name : '19/04/2018 13:00:01',
            type: 'run'
        }]

        $scope.secondPage = function(){
            $scope.results = secondPage;
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.previewChange = function(){
              $scope.preview = !$scope.preview;
          }
        $scope.preview = true;
     


}])