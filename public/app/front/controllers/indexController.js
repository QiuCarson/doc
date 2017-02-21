
define(['app'], function(app){

    return app.controller('indexController', ['$scope','$http','$state', function ($scope, $http, $state) {

        $scope.load=function(){
            $http.get( '/front/nav')
                .then(function(response) {

                    $scope.list=response.data;
                     //console.log(response.data);

                });
        }
        $scope.load();

    }])
})