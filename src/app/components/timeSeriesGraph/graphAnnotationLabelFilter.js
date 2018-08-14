app.filter('graphAnnotationLabelFilter', function () {
    return function (annotationArray) {
        var filterAnnotationArray = [];
        for (var i = 0, n = annotationArray.length; i < n; i++) {
            filterAnnotationArray.push(annotationArray[i].label);
        }
        return filterAnnotationArray;
    }
})