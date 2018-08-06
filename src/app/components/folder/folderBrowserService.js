app.service('folderBrowserService', ['$log', function ($log) {

    var self = this;

    var folders = new Map();

    function folderStruct(id=uniqueId(),data={},children=[],parent) {
        this.id=id;
        this.data=data;
        this.children=children;
        this.parent=parent;
    }


    function uniqueId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    self.createFolder = function(id,data){
        var folder = new folderStruct(id,data,undefined,undefined);
        folders.set(folder.id,folder);
        return folder.id;
    }

    self.addChildren= function(parentID,childrenIDs){
        var parent = self.getFolder(parentID);
        for(var i=0,n=childrenIDs.length;i<n;i++){
            parent.children.push(childrenIDs[i]);
            var child = self.getFolder(childrenIDs[i]);
            child.parent = parentID;
        }
    }

    

    self.getFolder = function(id){
        return folders.get(id);
    }
}])