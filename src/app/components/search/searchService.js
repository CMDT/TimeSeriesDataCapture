app.service('searchService', ['$log', '$http', 'queryKeywordService', function ($log, $http, queryKeywordService) {

    var self = this;

    
    self.searchRequest = function (queryArray) {
        var config = {
            params: {},
            responseType: 'json'
        }

        var url = 'http://10.182.45.87:8000/apis/search';

        for(var i=0,n=queryArray.length;i<n;i++){
            var value = queryArray[i].value;
            if(value.length > 1){
                config.params[queryArray[i].name] = self.queryParamArray(value);
            }else{
        
                config.params[queryArray[i].name] = value[0];
            }
        }
        return $http.get(url, config);
    }

    self.queryParamArray = function(param){
        var parseParam = '';
        for(var i=0,n=param.length-1;i<n;i++){
            parseParam += param[i] + ',';
        }
        parseParam += param[param.length-1];
        return parseParam;
    }

    
}])