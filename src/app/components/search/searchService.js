app.service('searchService', ['$log', '$http', 'tagPredictionService', 'dtFormatterService', 'urlFormatterService', function ($log, $http, $tagPredictionService, dtFormatterService, urlFormatterService) {

    var self = this;

    self.searchRequest = function (search) {
        return new Promise(function (resolve, reject) {

            urlFormatterService.setUrl('http://10.182.45.87:8000/apis/search');


            search = search.replace(dateParse(search),'');
            search = search.replace(timeParse(search),'');

            $log.log(urlFormatterService.getUrl());
            self.tagPrediction('gold').then(function (result) {
                return result
            })
                .then(function (result) {

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

    self.tagPrediction = function (tag) {
        return new Promise(function (resolve, reject) {
            $tagPredictionService.tagRequest(tag).then(function (result) {
                resolve(result);
            });
        });

    }

    function dateParse(search) {
        var dateArray = dtFormatterService.dateExtract(search);
        if (dateArray != null && dateArray.length > 0) {
            $log.log('added date');
            search = search.replace(dateArray[0], '');
            urlFormatterService.addParameter('date', dtFormatterService.dateEncode(dateArray[0]));
        }

        return dateArray[0];
    }

    function timeParse(search) {
        var timeArray = dtFormatterService.timeExtract(search);
        if (timeArray != null && timeArray.length > 0) {
            $log.log('added time');
            search = search.replace(timeArray[0], '');
            urlFormatterService.addParameter('timeStamp', dtFormatterService.timeEncode(timeArray[0]));
        }

        return timeArray[0];

    }








}])