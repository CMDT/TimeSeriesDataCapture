var app = angular.module('app', ['ui.router', 'ngMaterial']);


app.config(config);

config.$inject = [
  '$stateProvider'
]

function config($stateProvider) {

  var homeState = {
    name: 'home',
    url: '/home/?query',
    templateUrl: 'app/shared/home/homeView.html',
    controller: 'homeController',
    resolve: {
    
    }
  }

  var callbackState = {
    name: 'callback',
    url: '/callback',
    templateUrl: 'app/shared/callback/callbackView.html',

  }




  $stateProvider.state(callbackState);
  $stateProvider.state(homeState);

}




