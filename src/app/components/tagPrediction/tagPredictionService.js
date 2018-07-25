app.service('tagPredictionService', ['$log', '$http', function ($log, $http) {

    var tagArray = []
    var lastTag = '';

    this.tagRequest = function (tag) {
        return new Promise(function (resolve, reject) {
            lastTagCheck(tag);
            lastTag = tag;
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
                $log.log(lastTag);
                for (var i = 0, n = data.length; i<n;i++) {
                    tagArray.push(data[i]._id);
                } 


                $log.log(tagArray);
                resolve(data);
            }).catch(function (error) {
                $log.error(error);
            })
        });

    }

    function lastTagCheck(newTag){
        $log.log(lastTag + ' ' + newTag);
        var same = false || newTag.includes(lastTag);
        
        if(same){
            for(var i=0, n= tagArray.length;i<n;i++){
                if(!(tagArray[i].includes(newTag))){
                    
                }
            }
        }
        
    }
}])