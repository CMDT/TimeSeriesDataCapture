app.service('getFolderService', ['$scope','$log', '$rootScope', '$http', 'folderBrowserService', 'folderBreadcrumbService', 'runRequestService', function ($scope,$log, $rootScope, $http, folderBrowserService, folderBreadcrumbService, runRequestService) {

    var self = this;
    var rootFolderId;


    self.setRootFolder = function (folderId) {
        rootFolderId = folderId
    }


    self.up = function () {
        return new Promise(function (resolve, reject) {
            var path = folderBreadcrumbService.getPath();
            self.getFolder(path[path.length - 2]).then(function (result) {
                return resolve(result);
            })
        })


    }

    self.getFolder = function (folderObject) {

        return new Promise(function (resolve, reject) {
            if (folderObject.hasOwnProperty('id')) {
                var folder = self.getComponentCacheById(folderObject.id);
                if (folder != undefined) {
                    folderBreadcrumbService.navigate({ name: folder.name, id: folder.id })
                    return resolve(folder);
                }
            }

            var id = folderObject.id;
            if (rootFolderId == folderObject.id) {
                id = undefined;
            }

            self.getComponentFromServer(id, 'folder').then(function (result) {
                var newFolder = self.newFolder(folderObject.id, folderObject.name, result.data.folders);
                folderBreadcrumbService.navigate({ name: newFolder.name, id: newFolder.id })
                return resolve(newFolder);
            })
        });
    }

    self.getRun = function (runObject) {
        return new Promise(function (resolve, reject) {
            var run = self.getComponentCacheById(runObject.id);
            if (run != undefined) {
                folderBreadcrumbService.navigate({ name: run.name, id: run.id })
                return resolve(run);
            }

            self.getComponentFromServer(runObject.id, 'run').then(function (result) {
                var newFolder = self.newFolder(runObject.id, runObject.name, result.data);
                folderBreadcrumbService.navigate({ name: newFolder.name, id: newFolder.id })
                return resolve(newFolder);
            })
        })
    }

    self.getComponentCacheById = function (componentId) {
        return folderBrowserService.getFolder(componentId);
    }

    self.getComponentFromServer = function (componentId, type) {
        return new Promise(function (resolve, reject) {
            if (type === 'folder') {
                self.folderRequest(componentId).then(function (result) {
                    return resolve(result)
                })
            }

            if (type === 'run') {
                runRequestService.getRunPreview(componentId).then(function (result) {
                    return resolve(result);
                })
            }
        });
    }

    self.checkCache = function (folderId) {
        var folder = folderBrowserService.getFolder(folderId);
        if (folder != undefined) {
            return (folder);
        } else {
            return (undefined);
        }
    }

    self.clearCache = function () {
        rootFolderId = undefined;
        folderBrowserService.clearCache();
        folderBreadcrumbService.home();
    }


    self.folderRequest = function (folderId) {
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

    self.newFolder = function (folderId, folderName, data, parentId) {
        var newFolderId = folderBrowserService.createFolder(folderId, folderName, data);

        if (parentId != undefined) {
            folderBrowserService.addChildren(parentId, [newFolderId]);
        }

        return folderBrowserService.getFolder(newFolderId);
    }


    /*=====================================================*/

    

}])