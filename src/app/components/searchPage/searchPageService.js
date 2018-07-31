app.service('searchPageService', ['$log', 'tagPredictionService', 'searchService', 'dtFormatterService', function ($log, $tagPredictionService, searchService, dtFormatterService) {

    var self = this;

    self.search = function (query) {
        return new Promise(function (resolve, reject) {
            var queryObject = self.searchService.searchExtract(query);
            queryObject = self.searchService.queryUrlEncode(queryObject);
            $log.log(queryObject);
            searchService.searchRequest(queryObject).then(function (result) {
                $log.log(result);
            })
        });
    }

    self.searchExtract = function (search) {
        var query = []
        var keywords = queryKeywordService.getKeywords();
        for (var i = 0, n = keywords.length; i < n; i++) {
            var regexResult = search.match(keywords[i].regex);

            if (regexResult != null) {

                if (keywords[i].singleton) {
                    regexResult = [regexResult[0]];
                }
                query.push({
                    name: keywords[i].name,
                    value: regexResult
                })
            }
        }
        return query;
    }

    self.queryUrlEncode = function (queryObject) {
        var encodedObject = queryObject;
        for (var i = 0, n = encodedObject.length; i < n; i++) {
            for (var j = 0, k = encodedObject[i].value.length; j < k; j++) {
                encodedObject[i].value[j] = queryKeywordService.urlEncode(encodedObject[i].name, encodedObject[i].value[j]);
            }
        }
        return encodedObject;
    }


    self.tagPrediction = function (tag) {
        return new Promise(function (resolve, reject) {
            $tagPredictionService.getTagID(tag).then(function (result) {

                resolve(result.data);
            }).catch(function (error) {
                $log.log(error);
            });
        });
    }
}])