app.service('timeSeriesAnnotationService', ['$log', '$filter', function ($log, $filter) {

    var self = this;
    var annotations = [];
     
   
    function annotationBadge(title = self.titleGen(), data = {}) {
        this.title = title;
        this.data = data;
        this.note = {
            label: 'Label',
            title: title
        };
        this.subject = {
            text: title,
            y: 'top',
        };
    }

    self.addAnnotation = function (title, data, description) {
        data['description'] = description;
        var newAnnotation = new annotationBadge(title, data);

        annotations.push(newAnnotation)
    }

    self.removeAnnotation = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                annotations = annotations.splice(i,1);
            }
        }
    }

    self.getAnnotations = function () {
        return annotations;
    }

    self.getAnnotation = function (title) {
        for (var i = 0, n = annotations.length; i < n; i++) {
            if (annotations[i].title === title) {
                return annotations[i];
            }
        }
    }

    self.updateAnnotation = function(title,updateData){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                annotations[i].data = updateData;
                return annotations[i];
            }
        }
    }

    self.titleGen = function () {
        asciiA = 65;
        asciiValue = asciiA + annotations.length;
        return String.fromCharCode(asciiValue);
    }

}])