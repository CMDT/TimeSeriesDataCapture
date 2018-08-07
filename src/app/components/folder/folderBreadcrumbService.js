app.service('folderBreadcrumbService', ['$log', function ($log) {

    var self = this;

    var path = [];

    self.goTo = function (folderName) {
        $log.log(folderName);
        path.push(folderName);
    }

    self.backTo = function (folderName) {
        for (var i = 0, n = path.length; i < n; i++) {
            if (folderName === path[i]) {
                path = path.slice(i);
                break;
            }
        }
    }

    self.home = function () {
        path = [];
    }

    self.getPath = function(){
        return path;
    }

}])