app.controller('annotationPreviewController', ['$scope', '$log','timeSeriesGraphService','timeSeriesAnnotationService', function ($scope, $log,timeSeriesGraphService,timeSeriesAnnotationService) {

  

    var lastAnnotationDesciption = '';
   
    var annotation = timeSeriesGraphService.getAnnotationInEdit();
    
    $scope.annotationTitle = 'Annotation ' + annotation.note.title;
    $scope.annotationDescription = annotation.data.description;
    $scope.editMode = false;

    $scope.annotationEdit = function(){
        lastAnnotationDesciption = $scope.annotationDescription;
        $scope.editMode = !($scope.editMode);
    }

    $scope.confirm = function(){
        $log.log($scope.annotationDescription);
        var newData= {
            Time : annotation.data.Time,
            RTH : annotation.data.RTH,
            description : $scope.annotationDescription
        }
        timeSeriesAnnotationService.updateAnnotation(annotation.note.title,newData);
        $scope.editMode = false;
    }

    $scope.cancel = function(){
        $scope.annotationDescription = lastAnnotationDesciption;
        $scope.editMode = false;
    }

    



}])