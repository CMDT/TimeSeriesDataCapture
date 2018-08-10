app.service('componentIdsService', ['$rootScope','$log','$http', function ($rootScope, $log, $http) {

    var self = this;



    self.getComponentIds = function (folderId) {
        return new Promise(function (resolve, reject) {
            var config = {
                params: {},
                headers: {},
                responseType: 'json'
            }
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
            config.params.folderID = folderId;

            var url = $rootScope.url + '/apis/components';
            $log.log(url);

            $http.get(url, config).then(function (result) {
                resolve(result);
            });
        })
    }

    self.postComponentIds = function (components) {
        return new Promise(function (resolve, reject) {
            var config = {
                headers: {},
                responseType: 'json'
            }
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
           

            var url = $rootScope.url + '/apis/components';
            $log.log(url);

            $http.post(url,components, config).then(function (result) {
                resolve(result);
            });
        })
    }

    

   

}])