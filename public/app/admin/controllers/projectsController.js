define(['app'], function(app) {
    app.controller('projectsListController',['$scope','$http','$state',function($scope, $http, $state){
            $scope.currentPage = 1;
            $scope.maxSize=5;
            $scope.load=function(){
                $http.get( '/admin/projects/list/'+$scope.currentPage)
                    .then(function(response) {

                        $scope.list=response.data.data;
                        $scope.totalItems=response.data.count;
                        $scope.itemsPerPage=response.data.pageSize;
                        $scope.numPages=Math.ceil($scope.count / $scope.pageSize);

                    });
            }
            $scope.load();
            $scope.pageChanged = function() {
                $scope.load();
            };

            $scope.deleted =function(id){
                if(!confirm("确定删除？")){
                    return false;
                }else{
                    //console.log(id);
                    $http.delete( '/admin/projects/delete/'+id.id)
                        .then(function(response) {
                            if ( response.data.status ) {
                                $state.go('main.projects.list',{},{ reload: true });
                            }

                        });
                }
            };

        }])
        .controller('projectsAddController',['$scope','$http','$state',function($scope, $http, $state){

            $scope.create = function(){
                $http.post( '/admin/projects/create', {
                        projects_name: $scope.projects.projects_name,

                    })
                    .then(function(response) {
                        if ( !response.data.status ) {
                            // $scope.message = response.data.message;
                            $scope.alert = {type: 'danger', msg: response.data.message };
                            $scope.isCollapsed = false;
                        }else{
                            //$scope.success = '数据插入成功';
                            $scope.alert = {type: 'success', msg: '数据插入成功' };
                            $scope.isCollapsed = false;
                            $state.go('main.projects.list');
                        }
                    }, function(x) {
                        //$scope.message = '数据插入失败';
                        $scope.alert = {type: 'danger', msg: '数据插入失败' };
                        $scope.isCollapsed = false;
                    })
            }
            $scope.closeAlert = function() {
                $scope.isCollapsed = true;
            };
            $scope.isCollapsed = true;

        }])
        .controller('projectsEditController',['$scope','$http','$state','$stateParams',function($scope, $http, $state, $stateParams){
            var id=$stateParams.id;

            $scope.edit = function(){
                $http.put( '/admin/projects/edit/'+id, {
                        projects_name: $scope.projects.projects_name,

                    })
                    .then(function(response) {
                        if ( !response.data.status ) {
                            // $scope.message = response.data.message;
                            $scope.alert = {type: 'danger', msg: response.data.message };
                            $scope.isCollapsed = false;
                        }else{
                            //$scope.success = '数据插入成功';
                            $scope.alert = {type: 'success', msg: '数据插入成功' };
                            $scope.isCollapsed = false;
                            $state.go('main.products.list');
                        }
                    }, function(x) {
                        $scope.alert = {type: 'danger', msg: '数据更新失败' };
                        $scope.isCollapsed = false;
                    })
            }


            $scope.getone = function(){
                $http.get( '/admin/projects/edit/'+id )
                    .then(function(response) {
                        console.log(response );
                        if(response.data.status){
                            // console.log(response.data.data.posts_content);
                            $scope.projects=response.data.data;
                        }
                    })
            }
            $scope.closeAlert = function() {
                $scope.isCollapsed = true;
            };
            $scope.isCollapsed = true;
            $scope.getone();
        }])
})