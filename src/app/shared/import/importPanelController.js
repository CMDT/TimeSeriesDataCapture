app.controller('importPanelController', ['$scope','$rootScope', '$log', '$mdDialog','$location','$transitions', function ($scope,$rootScope, $log, $mdDialog,$location,$transitions) {


    $scope.$on('$locationChangeStart', function () {
        $rootScope.actualLocation = $location.path();
        event.preventDefault();
        history.forward();
      });
        $scope.results = [{
            name : '24/03/2018 11:00:01',
            type: 'folder'
        },
        {
            name : '25/03/2018 12:23:12',
            type: 'run'
        },
        {
            name : '26/03/2018 15:33:21',
            type: 'run'
        },
        {
            name : '27/03/2018 09:00:01',
            type: 'folder'
        }]

        var secondPage = [{
            name : '18/04/2018 13:00:01',
            type: 'run'
        },
        {
            name : '19/04/2018 13:00:01',
            type: 'run'
        }]

        $scope.secondPage = function(){
            $scope.results = secondPage;
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.previewChange = function(){
              $scope.preview = !$scope.preview;
          }
        $scope.preview = true;
     


}])


/* 
           $rootScope.$on('$locationChangeSuccess', function() {
    $rootScope.currentLocation = $location.url();
})
  $transitions.onStart({}, function(transition) {

    console.log(window.history.length);
    var currentLocation = $rootScope.currentLocation.split('?');
    var newLocation = transition.to().url.split('?');


    newLocationParams = transition.params();
    newLocationParamsKeys = Object.keys(newLocationParams);

    newLocation[1] = '';
    for(var i=0, n=newLocationParamsKeys.length;i<n;i++){
      if(newLocationParamsKeys[i] !== '#'){
        var param = newLocationParams[newLocationParamsKeys[i]];
        if(param != undefined){
          newLocation[1] += newLocationParamsKeys[i] + '=';
          if(i !== n-1){
            newLocation[1] += newLocationParams[newLocationParamsKeys[i]] + '&';
          }else{
            newLocation[1] += newLocationParams[newLocationParamsKeys[i]];
          }
        }
      }
    }
    if(newLocation !== ''){
      newLocation = newLocation.slice(0,1)
    }else{
      newLocation[1] = encodeURI(newLocation[1]);
    }

    
    
    var backPressed = true;

    if(newLocation.length)
    for(var i=0,n=newLocation.length;i<n;i++){
      if(newLocation[i] !== currentLocation[i]){
        backPressed =false;
        break;
      }
    }

    if(backPressed){
    
      console.log('back pressed');
      transition.abort();
     
    }
    
    
  });  */



  