app.service('tagPredictionService', ['$log', '$http', function ($log, $http) {

  

    this.tagRequest = function (tag) {
        return new Promise(function (resolve, reject) {
            
            var req = {
                method: 'GET',
                url: 'http://10.182.45.87:8000/apis/tags?tags=' + encodeURI(tag),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            };

          


            $http(req).then(function (result) {
                var data = result.data;
        
                
                resolve(data);
            }).catch(function (error) {
                $log.error(error);
            })
        });

    }

    
    
}])