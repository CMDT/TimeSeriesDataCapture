app.service('urlFormatterService', ['$log', function ($log) {


    var self = this;
    var url = '';
    var firstParam = true;


    self.setUrl = function (newUrl) {
        url = newUrl;
    }

    self.addParameter = function(key,value){
        if(firstParam){
            url += '?' 
        }else{
            url+= '&'
        }

        url += + key + "=" + value;
    }

    self.getUrl = function(){
        return url;
    }






}])