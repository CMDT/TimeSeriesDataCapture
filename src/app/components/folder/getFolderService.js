app.service('getFolderService', ['$log', '$rootScope', '$http', function ($log, $rootScope, $http) {

    var self = this;

    self.getFolder = function (folderID) {
        var config = {
            params: {},
            headers: {},
            responseType: 'json'
        }
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
        config.params.folderID = folderID;

        var url = $rootScope.url + '/apis/components';
        $log.log(url);
        return $http.get(url, config);
    }

}])