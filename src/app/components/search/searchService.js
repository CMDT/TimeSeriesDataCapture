app.service('searchService', ['$log', '$http', 'tagPredictionService', function ($log, $http, $tagPredictionService) {

 

    this.searchRequest = function () {
        return new Promise(function (resolve, reject) {
            var req = {
                method: 'GET',
                url: 'http://10.182.45.87:8000/apis/search?tags=5b586a240a37cfb25dcc1b2b',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req).then(function (result) {

                resolve(result.data);
            })
        })

    }


    this.tagPrediction = function (tag) {
        return new Promise(function (resolve, reject) {
            $tagPredictionService.tagRequest(tag).then(function (result) {

                resolve(result);
            });
        });

    }
}])