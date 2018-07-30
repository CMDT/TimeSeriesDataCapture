app.service('dtFormatterService', ['$log', function ($log) {

  
    var self = this;

    self.dateEncode = function(date){
        var dateArray = date.split("/");
        var date= ''
        for(var i=dateArray.length-1;i>=0;i--){
            date += dateArray[i];
        }

        return date;

    }

    self.dateDecode = function(date){
        var year = date.slice(0,4);
        var month = date.slice(4,6);
        var day = date.slice(6);
        
        var date = day +'/' + month + '/' + year;
        return(date);

    }

    self.timeEncode = function(time){
        
        return(time.replace(/:/g,''));
    }

    self.timeDecode = function(time){
        var decodeTime = ''
        for(var i=0;i<2;i++){
            decodeTime += time.slice(i*2,(i+1)*2) + ':';
        }
        decodeTime += time.slice(4,6);
        return decodeTime;
    }

    self.dateExtract = function(value){
        var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
        var dateArray = (dateRegex.exec(value));
        return dateArray
    }

    self.timeExtract = function(value){
        var timeRegex = /(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/;
        var timeArray = (timeRegex.exec(value));
        return timeArray;
    }

    self.tagEncode = function(tags){
        var tagsEncoded = '';
        for(var i=0, n= (tags.length-1);i<n;i++){
            tagsEncoded += tags[i] + ','
        }
        tagsEncoded += tags[tags.length-1]
        return tagsEncoded;
    }


    
    
}])