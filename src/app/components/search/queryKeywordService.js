app.service('queryKeywordService', ['$log','dtFormatterService', function ($log,dtFormatterService) {

    var self = this;

    var keywords = [];

    function keyword(name,regex){
        this.name = name;
        this.regex = regex;
    }

    //date
    var date = new keyword('date',/\d{1,2}\/\d{1,2}\/\d{4}/);
    keywords.push(date);
    //time
    var time = new keyword('time',/(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]/);
    keywords.push(time);
    //tag
    var tag = new keyword('tag',/\b[a-z]{1,20}\b/g);
    keywords.push(tag);

    self.getKeywords = function(){
        return keywords;
    }
  
    
    
}])