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
        this.hidden = true;
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

    self.getAnnotation = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                return annotations[i];
            }
        }
    }

    self.getAnnotationLabels = function(){
        return ($filter('annotationLabelFilter')(annotations));
    }

    self.annotationLabelHide = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                annotations[i].subject.label.hidden = true;
            }
        }
    }

    self.annotationLabelHideAll = function(){
        for(var i=0,n=annotations.length;i<n;i++){
            annotations[i].subject.label.hidden = true;
        }
    }

    self.annotationLabelShow = function(title){
        for(var i=0,n=annotations.length;i<n;i++){
            if(annotations[i].title === title){
                annotations[i].subject.label.hidden = false;
            }
        }
    }

    self.annotationLabelShowAll = function(){
        for(var i=0,n=annotations.length;i<n;i++){
            annotations[i].subject.label.hidden = false;
        }
    }

   
   

    

    self.titleGen = function(){
        asciiA = 65;
        asciiValue = asciiA + annotations.length;
        return String.fromCharCode(asciiValue);
    }


  

    

   

}])