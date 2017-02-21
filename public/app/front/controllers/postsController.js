/**
 * Created by hyt on 2017/2/21.
 */
define(['app'], function(app) {
    app.controller('postsController', ['$scope','$http','$state','$sce','$stateParams',function($scope, $http, $state,$sce,$stateParams){
        $scope.load=function(){
            $http.post( '/front/posts',{id:$stateParams.id})
                .then(function(response) {

                    $scope.posts=response.data;
                    $scope.posts_content=$sce.trustAsHtml(response.data.posts_content);
                   // console.log(response.data);

                });
        }
        $scope.load();
        $scope.list=function(){

        }
        //console.log($scope.$stateParams);

    }])
})