app.service('getFolderService', ['$log', '$rootScope', '$http', 'folderBrowserService', 'folderBreadcrumbService', function ($log, $rootScope, $http, folderBrowserService, folderBreadcrumbService) {

    var self = this;
    var rootfolderId;
    var activefolderId = undefined;
    self.getFolder = function (folderName,folderId) {
        return new Promise(function (resolve, reject) {
            var id = folderId || rootfolderId;
            var folder = folderBrowserService.getFolder(id);
            if (folder != undefined) {
                activefolderId = folder.id;
                folderBreadcrumbService.navigate({id:folder.id,name:folder.name});
                return resolve(folder);
            }

            self.componentsRequest(folderId).then(function(result){
                var newFolder = self.newFolder(folderId,folderName,result.data.folders);
                if(folderId == undefined){
                    rootfolderId = newFolder.id;
                }
                folderBreadcrumbService.navigate({id:newFolder.id,name:newFolder.name});
                return resolve(newFolder);
            })
        })
    }
    

    self.componentsRequest = function (folderId) {
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

    self.newFolder = function (folderId,folderName,data) {
        var newFolderId = folderBrowserService.createFolder(folderId,folderName,data);

        if (activefolderId != undefined) {
            folderBrowserService.addChildren(activefolderId, [newFolderId]);
        }

        activefolderId = newFolderId;
        return folderBrowserService.getFolder(newFolderId);
    }



}])