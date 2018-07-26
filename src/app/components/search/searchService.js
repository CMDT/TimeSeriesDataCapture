app.service('searchService', ['$log', '$http', 'tagPredictionService', 'dtFormatterService', 'urlFormatterService', function ($log, $http, $tagPredictionService, dtFormatterService, urlFormatterService) {

    var self = this;

    self.searchRequest = function (search) {
        return new Promise(function (resolve, reject) {

            urlFormatterService.setUrl('http://10.182.45.87:8000/apis/search');

            var date = dateParse(search);
            if (date != null) {
                search = search.replace(date, '');
            }

            var time = timeParse(search);
            if (time != null) {
                search = search.replace(time, '');
            }


            var tagArray = search.split(' ');

            tagParse(tagArray)
                .then(function (result) {
                    $log.log(result);
                    $log.log(result.length);
                    var tags = '';
                    if (result[0].length > 0) {
                        for (var i = 0, n = result.length - 1; i < n; i++) {

                            tags += result[i][0]['_id'] + ',';
                        }
                        tags += result[result.length - 1][0]['_id'];

                        urlFormatterService.addParameter('tags', tags);
                        resolve();
                    }



                })
                .then(function (result) {
                    $log.log(urlFormatterService.getUrl());
                    var req = {
                        method: 'GET',
                        url: urlFormatterService.getUrl(),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    $http(req).then(function (result) {

                        resolve(result.data);
                    })
                })

        })

    }

    /*self.search = function (search) {
        return new Promise(function (resolv, reject) {
            var date = dateParse(search);
            if (date != null) {
                search = search.replace(date, '');
            }

            var time = timeParse(search);
            if (time != null) {
                search = search.replace(time, '');
            }

            var tags = '';
            var tagArray = search.split(' ');
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
                .then(searchRequest(tags,date,time)
        })

    }*/

    self.searchRequest = function (tags, date, time) {
        return new Promise(function (resolve, reject) {
            if (tags == null && date == null && time == null) {
                resolve([]);
            }

            urlFormatterService.setUrl('http://10.182.45.87:8000/apis/search');
            if (tags != null) {
                urlFormatterService.addParameter('tags', tags);
            }
            if (date != null) {
                urlFormatterService.addParameter('date', date);
            }
            if (time != null) {
                urlFormatterService.addParameter('time', time);
            }

            $log.log(urlFormatterService.getUrl());
            var req = {
                method: 'GET',
                url: urlFormatterService.getUrl(),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req).then(function (result) {

                resolve(result.data);
            })
        })



    }



    self.tagPrediction = function (tag) {
        return new Promise(function (resolve, reject) {
            $tagPredictionService.tagRequest(tag).then(function (result) {
                resolve(result);
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


    function dateParse(search) {
        var dateArray = dtFormatterService.dateExtract(search);

        if (dateArray != null) {

            search = search.replace(dateArray[0], '');
            urlFormatterService.addParameter('date', dtFormatterService.dateEncode(dateArray[0]));
            return dateArray[0];
        } else {
            return null;
        }


    }

    function timeParse(search) {
        var timeArray = dtFormatterService.timeExtract(search);
        if (timeArray != null) {
            search = search.replace(timeArray[0], '');
            urlFormatterService.addParameter('timeStamp', dtFormatterService.timeEncode(timeArray[0]));
            return timeArray[0];
        } else {
            return null;
        }
    }


}])