app.service('getFolderService', ['$log', 'folderBrowserService', 'runRequestService', 'componentIdsService', function ($log, folderBrowserService, runRequestService, componentIdsService) {

    var self = this;
    var rootFolderId;


    self.setRootFolder = function (folderId) {
        rootFolderId = folderId
    }


    self.getComponent = function (componentObject) {
        return new Promise(function (resolve, reject) {
            if (componentObject.type === 'folder') {
                self.getFolder(componentObject).then(function (result) {
                    return resolve(result);
                })
            }

            if (componentObject.type === 'run') {
                self.getRun(componentObject).then(function (result) {
                    return resolve(result);
                })
            }
        })
    }

    self.getFolder = function (folderObject) {

        return new Promise(function (resolve, reject) {
            if (folderObject.hasOwnProperty('id')) {
                var folder = self.getComponentCacheById(folderObject.id);
                if (folder != undefined) {
                    return resolve(folder);
                }
            }

            var id = folderObject.id;
            if (rootFolderId == folderObject.id) {
                id = undefined;
            }

            self.getComponentFromServer(id, 'folder').then(function (result) {
                var newFolder = self.newFolder(folderObject.id, folderObject.name, result.data.folders);
                return resolve(newFolder);
            })
        });
    }

    self.getRun = function (runObject) {
        return new Promise(function (resolve, reject) {
            var run = self.getComponentCacheById(runObject.id);
            if (run != undefined) {
                return resolve(run);
            }

            self.getComponentFromServer(runObject.id, 'run').then(function (result) {
                var newFolder = self.newFolder(runObject.id, runObject.name, result.data);
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
                componentIdsService.getComponentIds(componentId).then(function (result) {
                    return resolve(result);
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
    }

    self.importRuns = function(runs){
        componentIdsService.postComponentIds(runs).then(function(result){
            $log.log(result);
        })
    }




    self.newFolder = function (folderId, folderName, data, parentId) {
        var newFolderId = folderBrowserService.createFolder(folderId, folderName, data);

        if (parentId != undefined) {
            folderBrowserService.addChildren(parentId, [newFolderId]);
        }

        return folderBrowserService.getFolder(newFolderId);
    }






}])