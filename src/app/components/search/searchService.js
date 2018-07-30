app.service('searchService', ['$log', '$http', 'tagPredictionService', 'dtFormatterService', 'queryKeywordService', function ($log, $http, $tagPredictionService, dtFormatterService, queryKeywordService) {

    var self = this;


    self.search = function (search) {
        return new Promise(function (resolve, reject) {

            tagParse(tagArray)
                .then(function (result) {

                    if (result[0].length > 0) {
                        for (var i = 0, n = result.length - 1; i < n; i++) {

                            tags += result[i][0]['_id'] + ',';
                        }
                        tags += result[result.length - 1][0]['_id'];
                        return
                    } else {
                        tags = null;
                    }

                })
                .then(function (result) {
                    self.searchRequest(tags, date, time).then(function (response) {
                        resolve(response.data)
                    });

                })
        })
    }


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
            config['params']['time'] = time;
        }


        return $http.get(url, config);

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

    function tagParse(tagArray) {

        return new Promise(function (resolve, reject) {
            const tagIdPromises = tagArray.map(self.tagPrediction);
            Promise.all(tagIdPromises).then(function (result) {

                resolve(result);
            })
        })

    }


}])