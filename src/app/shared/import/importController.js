app.controller('importController', ['$scope', '$log','$mdDialog', function ($scope, $log,$mdDialog) {

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          templateUrl: 'app/shared/import/importPanel.html',
          parent: angular.element(document.h1),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };


}])