app.service('timeSeriesAnnotationService', ['$log','$filter', function ($log,$filter) {

    var self = this;
    var annotations = [];
    
   function annotationBadge(title = self.titleGen(), data = {},label) {
        this.title = title;
        this.data = data;
        this.note = {
            label : 'Label',
            title : title
        };
        this.subject = {
            text: title,
            x: 'left',
            y: 'top',
            label: label
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
        
        var newAnnotationLabel = new annotationLabel(description,undefined,undefined);
        var newAnnotation = new annotationBadge(title,data,newAnnotationLabel);
    
        annotations.push(newAnnotation)
    }

    self.getAnnotations = function(){
        return annotations;
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