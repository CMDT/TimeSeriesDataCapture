app.controller('annotationPreviewController', ['$scope', '$log','$mdDialog','timeSeriesGraphService','timeSeriesAnnotationService', function ($scope, $log,$mdDialog,timeSeriesGraphService,timeSeriesAnnotationService) {

  

    var lastAnnotationDesciption = '';
   
    var annotation = timeSeriesGraphService.getAnnotationInEdit();
    var savedAnnotation;
    $scope.annotationTitle = 'Annotation ' + annotation.note.title;
    $scope.annotationDescription = annotation.data.description;
    $scope.editMode = false;

    if(savedAnnotation != undefined){
        if(savedAnnotation.data.Time != annotation.data.Time){
            timeSeriesAnnotationService.updateAnnotation(annotation.note.title,annotation.data);
        }
    }

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
        annotation.data = newData;
        $scope.editMode = false;
    }

    $scope.cancel = function(){
        $scope.annotationDescription = lastAnnotationDesciption;
        $scope.editMode = false;
    }

    $scope.annotationPosEdit = function(){
        savedAnnotation = annotation;
        $mdDialog.cancel(annotation);
    }

}])