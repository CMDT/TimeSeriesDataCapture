app.service('searchService', ['$log', '$http', 'dtFormatterService', 'queryKeywordService', function ($log, $http, $tagPredictionService, dtFormatterService, queryKeywordService) {

    var self = this;


    self.searchExtract = function (search) {
        var query = {}
        var keywords = queryKeywordService.getKeywords();
        for (var i = 0, n = keywords.length; i < n; i++) {
            var regexResult = search.match(keywords[i].regex);
            if (regexResult != null) {
                query[keywords[i].name] = regexResult;
            }
        }
        return query;
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
}])