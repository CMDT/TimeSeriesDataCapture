app.filter('annotationLabelFilter',function(){
    return function(annotationArray){
        var filterAnnotationArray = [];

        for(var i=0,n=annotationArray.length;i<n;i++){
           if(!(annotationArray[i].subject.label.hidden)){
               filterAnnotationArray.push(annotationArray[i]);
           }
        }
        return filterAnnotationArray;
    }
})