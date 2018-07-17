var app = angular.module('app', ['ui.router',]);


app.config(['$stateProvider',function($stateProvider){
    
    

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: 'app/shared/home/homeView.html',
        controller: 'homeController'
      }
    
      
    
      $stateProvider.state(homeState);
}]);


    
