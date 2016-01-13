angular.module("myApp.Controllers", [
    "ui.router",
    "ui.bootstrap",
    ])
.controller('IndexController', ['$scope','$http','$state',function($scope, $http, $state){
                $scope.load=function(){
                    $http.get( '/front/nav'+$scope.currentPage)
                        .then(function(response) {
                       
                        $scope.list=response.data.data; 
                       // $scope.count = response.data.count; 
                       // $scope.pageSize=response.data.pageSize; 
                       // $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);   

                        $scope.totalItems=response.data.count;
                        $scope.itemsPerPage=response.data.pageSize;
                        $scope.numPages=Math.ceil($scope.count / $scope.pageSize);
                        
                    });
                }
})