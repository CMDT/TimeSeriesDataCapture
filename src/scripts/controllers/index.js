var app = angular.module('app', ['ui.router',]);


app.config(['$stateProvider','$sceDelegateProvider',function($stateProvider,$sceDelegateProvider){
    
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'file:///Users/yusofbandar/Documents/Work/TimeSeriesProject/TimeSeriesDataCapture/src/views/main.html'
      ]);

    var helloState = {
        name: 'main',
        url: '/main',
        templateUrl: 'views/main.html'
      }
    
      
    
      $stateProvider.state(helloState);
}]);


