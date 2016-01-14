angular.module("myApp.Controllers", [
    "ui.router",
    "ui.bootstrap",
    ])
.controller('IndexController', ['$scope','$http','$state',function($scope, $http, $state){
                
                $scope.load=function(){
                    $http.get( '/front/nav')
                        .then(function(response) {
                       
                        $scope.list=response.data; 
                      // console.log(response.data);
                        
                    });
                }
                $scope.load();

}])
.controller('AlllistController', ['$scope','$http','$state',function($scope, $http, $state){
                
            $scope.load=function(){
                    $http.get( '/front/alllist')
                        .then(function(response) {
                       
                        $scope.list=response.data; 
                      // console.log(response.data);
                        
                    });
            }
            $scope.load();
               

}])
.controller('ListController', ['$scope','$http','$state',function($scope, $http, $state){
                
            $scope.load=function(){
                    $http.get( '/front/list/'+$scope.$stateParams.wid+'/'+$scope.$stateParams.pid)
                        .then(function(response) {
                       
                        $scope.list=response.data; 
                      // console.log(response.data);
                        
                    });
            }
            $scope.load();
               

}])
.controller('PostsController', ['$scope','$http','$state',function($scope, $http, $state){
          $scope.load=function(){
                    $http.get( '/front/posts/'+$scope.$stateParams.id)
                        .then(function(response) {
                       
                        $scope.posts=response.data; 
                       console.log(response.data);
                        
                    });
            }
            $scope.load();      
        $scope.list=function(){
            
        } 
         //console.log($scope.$stateParams);   

}])