app.service('searchPageService', ['$log', 'tagPredictionService', 'searchService', 'queryKeywordService', function ($log, $tagPredictionService, searchService, queryKeywordService) {

    var self = this;

    self.search = function (query) {
        return new Promise(function (resolve, reject) {
            var queryObject = self.searchExtract(query);
            self.queryUrlEncode(queryObject).then(function (result) {
                searchService.searchRequest(result).then(function (result) {
                    resolve(result.data);
                })
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
        return new Promise(function (resolve, reject) {
            var encodedObject = queryObject;
            var PromiseArray = [];
            for (var i = 0, n = encodedObject.length; i < n; i++) {
                if (encodedObject[i].name === 'tags') {

                    PromiseArray = encodedObject[i].value.map(self.tagPrediction);
                    encodedObject.splice(i, 1);

                }
            }

            Promise.all(PromiseArray).then(function (result) {


                for (var i = 0, n = encodedObject.length; i < n; i++) {
                    for (var j = 0, k = encodedObject[i].value.length; j < k; j++) {
                        encodedObject[i].value[j] = queryKeywordService.urlEncode(encodedObject[i].name, encodedObject[i].value[j]);
                    }
                }


                var tagIDArray = []

                for (var i = 0, n = result.length; i < n; i++) {
                    $log.log(result[i][0]);
                    if (result[i][0].hasOwnProperty('_id')) {

                        tagIDArray.push(result[i]._id)
                    }
                }

                encodedObject.push({
                    name: 'tags',
                    value: tagIDArray
                })
                $log.log(encodedObject);
                resolve(encodedObject);
            })

        });




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