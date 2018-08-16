app.service('timeSeriesAnnotationService', ['$log','$filter', function ($log,$filter) {

    var self = this;
    var annotations = [];
    
   function annotationBadge(title = self.titleGen(), data = {},description) {
        this.title = title;
        this.data = data;
        this.note = {
            label : 'Label',
            title : title
        };
        this.subject = {
            text: title,
            y: 'top',
        };
        this.description = description;
        
    }

   
    self.setX = function(xR){
        x = xR;
    }

    self.setY = function(yR){
        y= yR;
    }

    self.addAnnotation = function(title,data,description){
        var newAnnotation = new annotationBadge(title,data,description);
    
        annotations.push(newAnnotation)
    }

    self.getAnnotations = function(){
        return annotations;
    }

    self.getAnnotation = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                return annotations[i];
            }
        }
    }


      
    self.titleGen = function(){
        asciiA = 65;
        asciiValue = asciiA + annotations.length;
        return String.fromCharCode(asciiValue);
    }


  

    

   

}])