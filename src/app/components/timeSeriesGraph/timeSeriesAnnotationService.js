app.service('timeSeriesAnnotationService', ['$log','$filter', function ($log,$filter) {

    var self = this;
    const type = d3.annotationBadge;
    var annotations = [];
    var x;
    var y;


    function annotation(title = self.titleGen(), data = {}) {
        this.title = title;
        this.data = data;
        this.note = {
            label : 'Label',
            title : title
        };
        this.subject = {
            test: 'A',
            x: 'left',
            y: 'top'
        };
        this.hidden = false;
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
    }

    self.setX = function(xR){
        x = xR;
    }

    self.setY = function(yR){
        y= yR;
    }

    self.addAnnotation = function(title,data,description){
        var newAnnotation = new annotation(title,data,description);
        var newAnnotationLabel = new annotationLabel(description,undefined,undefined);
        annotations = {
            annotation: newAnnotation,
            label : newAnnotationLabel
        }
    }

    self.makeAnnotations = function(element){
        element.append('g').attr('class','annotation-group').call(makeAnnotations);
    }

    const makeAnnotations = d3.annotation()
        .notePadding(15)
        .type(type)
        .accessors({
            x: d=> x(d.Time),
            y: d=> y(d.RTH)
        })

    self.removeAnnotation = function(title){
        annotations.removeAnnotation(title);
    }

   

    

    self.titleGen = function(){
        asciiA = 65;
        asciiValue = asciiA + annotations.size;
        return String.fromCharCode(asciiValue);
    }


  

    

   

}])