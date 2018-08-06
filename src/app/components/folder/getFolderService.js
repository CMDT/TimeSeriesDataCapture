app.service('getFolderService', ['$log', '$rootScope', '$http', 'folderBrowserService', function ($log, $rootScope, $http, folderBrowserService) {

    var self = this;

    var activefolderId = undefined;
    self.getFolder = function (folderId) {
        return new Promise(function (resolve, reject) {
            
            var folder = folderBrowserService.getFolder(folderId);
            if (folder != undefined) {
                activefolderId = folderId;
                resolve(folder);
            }

            var config = {
                params: {},
                headers: {},
                responseType: 'json'
            }
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
            config.params.folderID = folderId;

            var url = $rootScope.url + '/apis/components';

            $http.get(url, config).then(function(result){
                resolve(self.newFolder(folderId,result.data.folders));
            });
        })

    }

    self.newFolder = function (folderId,data) {
        var newFolderId = folderBrowserService.createFolder(folderId,data);

        if(activefolderId != undefined){
            folderBrowserService.addChildren(activefolderId,[newFolderId]);
        }

        activefolderId = newFolderId;
        return folderBrowserService.getFolder(newFolderId);
    }



}])