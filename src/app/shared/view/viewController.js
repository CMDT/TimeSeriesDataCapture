app.controller('viewController', ['$scope', '$log', 'timeSeriesGraphService', function ($scope, $log,timeSeriesGraphService) {


    $scope.annotationEditMode = false;
    $scope.annotationTitle = 'Annotation Title';
    $scope.annotationDescription = 'Hi this is the annotation';

    $scope.annotationEdit = function(){
        $log.log('click');
        $scope.annotationEditMode = true;
    }
  














}])