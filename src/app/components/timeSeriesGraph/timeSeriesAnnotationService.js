app.service('timeSeriesAnnotationService', ['$log','$filter', function ($log,$filter) {

    var self = this;
    const type = d3.annotationBadge;
    var annotations = [];
    

   
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
   


    function annotationBadge(title = self.titleGen(), data = {}) {
        this.title = title;
        this.data = data;
        this.note = {
            label : 'Label',
            title : title
        };
        this.subject = {
            text: title,
            x: 'left',
            y: 'top'
        };
    }

    function annotationLabel(description,x,y){
        this.note = {
            label: description,
            bgPadding: 200,
            title: 'Annotations'
        },
        this.nx = x + 20,
        this.ny = y - 200,
        this.x = x;
        this.y = y;
        this.hidden = false;
    }

    self.setX = function(xR){
        x = xR;
    }

    self.setY = function(yR){
        y= yR;
    }

    self.addAnnotation = function(title,data,description){
        $log.log(self.titleGen());
        var newAnnotation = new annotationBadge(title,data,description);
        var newAnnotationLabel = new annotationLabel(description,undefined,undefined);
    
        annotations.push({
            annotation: newAnnotation,
            label: newAnnotationLabel
        })
    }

    self.getAnnotations = function(){
        $log.log($filter('graphAnnotationFilter')(annotations))
        return ($filter('graphAnnotationFilter')(annotations));
    }

    self.getAnnotationsLabel = function(){
        return ($filter('graphAnnotationLabelFilter')(annotations));
    }

    self.annotationClick = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations.annotationBadge.title === title){
                annotations.annotationLabel.hidden = true;
            }
        }
    }

   
   

    

    self.titleGen = function(){
        asciiA = 65;
        asciiValue = asciiA + annotations.length;
        return String.fromCharCode(asciiValue);
    }


  

    

   

}])