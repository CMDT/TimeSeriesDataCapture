app.service('searchService', ['$log', '$http', 'tagPredictionService','dtFormatterService','urlFormatterService', function ($log, $http, $tagPredictionService, dtFormatterService, urlFormatterService) {

    var self = this;

    self.searchRequest = function (search) {
        return new Promise(function (resolve, reject) {

            urlFormatterService.setUrl('http://10.182.45.87:8000/apis/search');
           
        
           
            var dateArray = dtFormatterService.dateExtract(search);
            var date = null
            if(dateArray != null && dateArray.length > 0){
                search = search.replace(dateArray[0],'');
                urlFormatterService.addParameter('date',dtFormatterService.dateEncode(dateArray[0]));
            }

            $log.log(urlFormatterService.getUrl());
            self.tagPrediction('gold').then(function(result){
                return result
            })
            .then(function(result){
            
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
                $log.log(result);
                resolve(result);
            });
        });

    }

   

   

 

    
}])