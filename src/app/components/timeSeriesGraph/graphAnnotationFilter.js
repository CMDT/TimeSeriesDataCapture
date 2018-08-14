app.filter('graphAnnotationFilter',function(){
    return function(annotationArray){
        var filterAnnotationArray = [];

        for(var i=0,n=annotationArray.length;i<n;i++){
           if(!annotationArray[i].annotation.hidden){
               filterAnnotationArray.push(annotationArray[i].annotation);
           }
        }

        return filterAnnotationArray;
    }
})