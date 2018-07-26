app.service('searchService', ['$log', '$http', 'tagPredictionService', function ($log, $http, $tagPredictionService) {

    var self = this;

    self.searchRequest = function (search) {
        return new Promise(function (resolve, reject) {

           
            var dateArray = dateExtract(search);
            var date = ''
            if(dateArray != null && dateArray.length > 0){
                $log.log(search);
                search = search.replace(dateArray[0],'');
                $log.log(search);
                date = dateFormat(dateArray[0]);
            }

            
            self.tagPrediction(searchArray[0]).then(function(result){
                return result
            })
            .then(function(result){
                $log.log(result[0]._id);
                var req = {
                    method: 'GET',
                    url: 'http://10.182.45.87:8000/apis/search?tags=' + result[0]._id,
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

    function dateExtract(search){
        var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
        var dateArray = (dateRegex.exec(search));
        return dateArray
        
    }

    function dateFormat(search){
        var dateArray = search.split("/");
        var date= ''
        for(var i=dateArray.length-1;i>=0;i--){
            date += dateArray[i];
        }

        return date;
    }

   

 

    
}])