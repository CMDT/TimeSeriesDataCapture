app.service('searchPageService', ['$log', 'tagPredictionService', 'searchService', 'dtFormatterService', function ($log, $tagPredictionService, searchService, dtFormatterService) {

    var self = this;

    self.search = function (query) {
        return new Promise(function (resolve, reject) {
            var queryObject = searchService.searchExtract(query);
            queryObject = searchService.queryUrlEncode(queryObject);
            


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

    self.tagParse = function (tagArray) {
        return new Promise(function (resolve, reject) {
            if (tagArray == undefined) {
                resolve([]);
            }
            const tagIdPromises = tagArray.map(self.tagPrediction);
            Promise.all(tagIdPromises).then(function (result) {
                var parsedResult = [];
                for (var i = 0, n = result.length; i < n; i++) {
                    parsedResult.push(result[i][0]);
                }
                resolve(parsedResult);
            })
        })

    }


}])