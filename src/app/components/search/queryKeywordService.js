app.service('queryKeywordService', ['$log','dtFormatterService', function ($log,dtFormatterService) {

    var self = this;

    var keywords = [];

    function keyword(name,regex,uiEncode,urlEncode){
        this.name = name;
        this.regex = regex;
        this.uiEncode = uiEncode;
        this.urlEncode = urlEncode;
    }

    //date
    var date = new keyword('date',/\d{1,2}\/\d{1,2}\/\d{4}/g,function(date){return dtFormatterService.dateDecode(date)},function(date){return dtFormatterService.dateEncode(date)});
    keywords.push(date);
    //time
    var time = new keyword('time',/(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/g,function(time){return dtFormatterService.timeDecode(time)},function(time){return dtFormatterService.timeEncode(time)});
    keywords.push(time);
    //tag
    var tag = new keyword('tag',/\b[a-z]{1,20}\b/g,function(tag){return tag},function(tag){return tag});
    keywords.push(tag);

    self.getKeywords = function(){
        return keywords;
    }

    self.uiEncode = function(keyword,value){
        for(var i=0, n = keywords.length;i<n;i++){
            if(keyword === keywords[i]){
                if(keywords[i].hasOwnProperty('uiEncode')){
                    return uiEncode(value);
                }
            }
        }

        return value;
    }

    self.urlEncode = function(keyword,value){
        for(var i=0, n = keywords.length;i<n;i++){
           
            if(keyword == keywords[i].name){
                $log.log(keyword + ' ' +keywords[i].name )
                if(keywords[i].hasOwnProperty('urlEncode')){
                    return keywords[i].urlEncode(value);
                }
            }
        }

        return value;
    }
  
    
    
}])