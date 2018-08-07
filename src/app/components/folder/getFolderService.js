app.service('getFolderService', ['$log', '$rootScope', '$http', 'folderBrowserService', 'folderBreadcrumbService','runRequestService', function ($log, $rootScope, $http, folderBrowserService, folderBreadcrumbService,runRequestService) {

    var self = this;
    var rootfolderId;
    var activefolderId = undefined;
    self.getFolder = function (folderName, folderId) {
        return new Promise(function (resolve, reject) {
            var id = folderId || rootfolderId;
            
            var cache = self.checkCache(id);

            if(cache != undefined){
                return resolve(cache);
            }

            self.componentsRequest(folderId).then(function (result) {
                var newFolder = self.newFolder(folderId, folderName, result.data.folders);
                if (folderId == undefined) {
                    rootfolderId = newFolder.id;
                }
                activefolderId = newFolder.id;
                folderBreadcrumbService.navigate({ id: newFolder.id, name: newFolder.name });
                return resolve(newFolder);
            })
        })
    }

    self.getRun = function (runName, runId) {
        return new Promise(function (resolve, reject) {
            var cache = self.checkCache(runId);

            if(cache != undefined){
                return resolve(cache);
            }

            runRequestService.getRunPreview(runId).then(function(result){
                var newFolder = self.newFolder(runId,runName,result.data);
                activefolderId = newFolder.id;
                folderBreadcrumbService.navigate({id: newFolder.id, name: newFolder.name});
                return resolve(newFolder);
            })
        })
    }

    self.checkCache = function (folderId) {
        var folder = folderBrowserService.getFolder(folderId);
        if (folder != undefined) {
            activefolderId = folder.id;
            folderBreadcrumbService.navigate({ id: folder.id, name: folder.name });
            return (folder);
        } else {
            return (undefined);
        }
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

    self.newFolder = function (folderId, folderName, data) {
        var newFolderId = folderBrowserService.createFolder(folderId, folderName, data);

        if (activefolderId != undefined) {
            folderBrowserService.addChildren(activefolderId, [newFolderId]);
        }

        activefolderId = newFolderId;
        return folderBrowserService.getFolder(newFolderId);
    }



}])