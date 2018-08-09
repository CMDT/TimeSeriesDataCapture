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

    self.postComponentIds = function (componentIds) {
        return new Promise(function (resolve, reject) {
            var config = {
                params: {},
                headers: {},
                responseType: 'json'
            }
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
            config.params.componentIDs = componentIds;

            var url = $rootScope.url + '/apis/components';
            $log.log(url);

            $http.post(url, config).then(function (result) {
                resolve(result);
            });
        })
    }

}])