app.service('urlFormatterService', ['$log', function ($log) {


    var self = this;
    var url = '';
    var firstParam = true;


    self.setUrl = function (newUrl) {
        url = newUrl;
        firstParam = true;
    }

    self.addParameter = function(key,value){
        if(firstParam){
            url += '?';
            firstParam = false; 
        }else{
            url+= '&';
        }

        url += key + "=" + value;
    }

    self.getUrl = function(){
        
        return url;
    }






}])