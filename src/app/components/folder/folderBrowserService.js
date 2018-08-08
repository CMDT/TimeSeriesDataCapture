app.service('folderBrowserService', ['$log', function ($log) {

    var self = this;

    cacheLimit = 2;
    var folders = new Map();

    function folderStruct(id = uniqueId(), name = 'root', data = {}, children = [], parent) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.children = children;
        this.parent = parent;
    }


    function uniqueId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    function checkCacheLimit() {
       
    }

    self.createFolder = function (id, name, data) {
        var folder = new folderStruct(id, name, data, undefined, undefined);

        checkCacheLimit();
        folders.set(folder.id, folder);
        $log.log(folders);
        return folder.id;
    }



    self.addChildren = function (parentID, childrenIDs) {
        var parent = self.getFolder(parentID);
        for (var i = 0, n = childrenIDs.length; i < n; i++) {
            parent.children.push(childrenIDs[i]);
            var child = self.getFolder(childrenIDs[i]);
            child.parent = parentID;
        }
    }

    self.clearCache = function () {
        folders.clear();
    }



    self.getFolder = function (id) {
        return folders.get(id);
    }
}])