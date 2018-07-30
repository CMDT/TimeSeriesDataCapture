app.service('searchPageService', ['$log', 'tagPredictionService', function ($log,$tagPredictionService) {

    var self = this;


    



    self.tagPrediction = function (tag) {
        return new Promise(function (resolve, reject) {
            $tagPredictionService.getTagID(tag).then(function (result) {

                resolve(result.data);
            }).catch(function (error) {
                $log.log(error);
            });
        });

    }

    self.tagParse = function(tagArray) {

        return new Promise(function (resolve, reject) {
            const tagIdPromises = tagArray.map(self.tagPrediction);
            Promise.all(tagIdPromises).then(function (result) {
                var parsedResult = [];
                for(var i=0, n=result.length;i<n;i++){
                    parsedResult.push(result[i][0]);
                }
                resolve(parsedResult);
            })
        })

    }


}])