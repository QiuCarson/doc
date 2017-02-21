/**
 * Created by hyt on 2017/2/21.
 */
define(['app'], function(app) {
    app.controller('alllistController', ['$scope','$http','$state',function($scope, $http, $state){

        $scope.load=function(){
            $http.get( '/front/alllist')
                .then(function(response) {

                    $scope.list=response.data;
                    // console.log(response.data);

                });
        }
        $scope.load();


    }])
})
