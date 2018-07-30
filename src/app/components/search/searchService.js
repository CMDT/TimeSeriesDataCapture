app.service('searchService', ['$log', '$http', 'queryKeywordService', function ($log, $http, queryKeywordService) {

    var self = this;


    self.searchExtract = function (search) {
        var query = []
        var keywords = queryKeywordService.getKeywords();
        for (var i = 0, n = keywords.length; i < n; i++) {
            var regexResult = search.match(keywords[i].regex);
            if (regexResult != null) {
                query.push({
                    name : keywords[i].name,
                    value: regexResult
                })
            }
        }
        return query;
    }

    self.queryUrlEncode = function(queryObject){
        
       
        for(var i=0, n= queryObject.length;i<n;i++){
           
            for(var j=0, k=queryObject[i].value.length;j<k;j++){
               
                var test = queryKeywordService.urlEncode(queryObject[i].name,queryObject[i].value[j]);
               
                
            }
        }

        return queryObject;

    }



    self.searchRequest = function (tags, date, time) {
        if (tags == null && date == null && time == null) {
            return ([]);
        }


        var config = {
            params: {},
            responseType: 'json'
        }

        var url = 'http://10.182.45.87:8000/apis/search';


        if (tags != null) {
            config['params']['tags'] = tags;
        }
        if (date != null) {
            config['params']['date'] = date;
        }
        if (time != null) {
            config['params']['timeStamp'] = time;
        }

        $log.log('request');
        return $http.get(url, config);

    }

    self.tagArrayParse = function(tagArray){
        var tags = ''
        for(var i=0,n=tagArray.length;i<n;i++){
            
        }
    }
}])