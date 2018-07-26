app.service('searchService', ['$log', '$http', 'tagPredictionService','dtFormatterService', function ($log, $http, $tagPredictionService, dtFormatterService) {

    var self = this;

    self.searchRequest = function (search) {
        return new Promise(function (resolve, reject) {

           
            var dateArray = dtFormatterService.dateExtract(search);
            var date = null
            if(dateArray != null && dateArray.length > 0){
                search = search.replace(dateArray[0],'');
                date = dtFormatterService.dateEncode(dateArray[0]);
            }

            
            self.tagPrediction('gold').then(function(result){
                return result
            })
            .then(function(result){
                $log.log(result[0]._id);
                var req = {
                    method: 'GET',
                    url: 'http://10.182.45.87:8000/apis/search?date=' + date,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
    
                $http(req).then(function (result) {
                    $log.log(result);
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

   

   

 

    
}])