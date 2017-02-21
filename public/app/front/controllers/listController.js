/**
 * Created by hyt on 2017/2/21.
 */

define(['app'], function(app) {
    app.controller('listController', ['$scope','$http','$state','$stateParams',function($scope, $http, $state,$stateParams){

        $scope.load=function(){
            //console.log($http);
            //console.log($stateParams)

            $http.get( '/front/list/'+$stateParams.wid+'/'+$stateParams.pid)
                .then(function(response) {

                    $scope.list=response.data;
                    // console.log(response.data);

                });
        }
        $scope.load();


    }])
})