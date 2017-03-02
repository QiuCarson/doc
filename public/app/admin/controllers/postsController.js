define(['app'], function(app) {
    app.controller('postsListController',['$scope','$http','$state','$stateParams',function($scope, $http, $state, $stateParams){
            $scope.currentPage = 1;

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.load=function(){
                $http.post( '/admin/posts/list',{
                    currentPage:$scope.currentPage
                })
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
            $scope.search=function(){
                $http.post( '/admin/posts/list/search',{
                        keyword: $scope.posts.keyword,
                        currentPage:$scope.currentPage
                })
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

            $scope.load();
            $scope.maxSize=2;
            $scope.pageChanged = function() {
                //$scope.load();
                $http.post( '/admin/posts/list',{
                        currentPage:$scope.currentPage
                    })
                    .then(function(response) {

                        $scope.list=response.data.data;
                        // $scope.count = response.data.count;
                        // $scope.pageSize=response.data.pageSize;
                        // $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);

                        //$scope.totalItems=response.data.count;
                        //$scope.itemsPerPage=response.data.pageSize;
                        //$scope.numPages=Math.ceil($scope.count / $scope.pageSize);

                    });

            };
            $scope.deleted =function(id){
                if(!confirm("确定删除？")){
                    return false;
                }else{
                    //console.log(id);
                    $http.delete( '/admin/posts/delete/'+id.id)
                        .then(function(response) {
                            if ( response.data.status ) {
                                $state.go('main.posts.list',{},{ reload: true });
                            }

                        });
                }
            };


        }])
        .controller('postsAddController',['$scope','$http','$state',function($scope, $http, $state){

            $scope.create = function(){
                $http.post( '/admin/posts/create', {
                        posts_title: $scope.posts.posts_title,
                        website: $scope.posts.website,
                        project: $scope.posts.project,
                        posts_description: $scope.posts.posts_description,
                        posts_content: $scope.posts.posts_content,
                    })
                    .then(function(response) {
                        if ( !response.data.status ) {
                            $scope.alert = {type: 'danger', msg: response.data.message };
                            $scope.isCollapsed = false;
                            //$scope.message = response.data.message;
                        }else{
                            // $scope.success = '数据插入成功';
                            $scope.alert = {type: 'success', msg: '数据插入成功' };
                            $scope.isCollapsed = false;
                            $state.go('main.posts.list');
                        }
                    }, function(x) {
                        $scope.alert = {type: 'danger', msg: '数据插入失败' };
                        $scope.isCollapsed = false;
                        //$scope.alert.type="danger";
                        // $scope.alert.msg = '数据插入失败';
                    })
            }
            $scope.load = function(){
                $http.get( '/admin/posts/addshow', {

                }).then(function(response) {
                    if ( response.data.status ) {
                        //$scope.show.websites= response.data.data.websites;
                        //console.log($scope.show.websites);
                        $scope.list=response.data.data;
                        $scope.posts.posts_content=response.data.data.posts_content;
                        //console.log(response.data.data.posts_content);
                        //$scope.posts.prodjects = response.data.data.prodjects;




                    }

                    //console.log(response);

                })
            }
            $scope.closeAlert = function() {
                $scope.isCollapsed = true;
            };
            $scope.isCollapsed = true;
            $scope.load();

        }])
        .controller('postsEditController',['$scope','$http','$state','$stateParams',function($scope, $http, $state,$stateParams){
            var id=$stateParams.id;

            $scope.edit = function(){
                $http.put( '/admin/posts/edit/'+id, {
                        posts_title: $scope.posts.posts_title,
                        website: $scope.posts.website,
                        project: $scope.posts.project,
                        posts_description: $scope.posts.posts_description,
                        posts_content: $scope.posts.posts_content,
                    })
                    .then(function(response) {
                        if ( !response.data.status ) {
                            //  $scope.message = response.data.message;
                            $scope.alert = {type: 'danger', msg:  response.data.message };
                            $scope.isCollapsed = false;
                        }else{
                            //$scope.success = '数据更新成功';
                            $scope.alert = {type: 'success', msg: '数据更新成功' };
                            $scope.isCollapsed = false;
                            $state.go('main.posts.list');
                        }
                    }, function(x) {
                        //$scope.message = '数据插入失败';
                        $scope.alert = {type: 'danger', msg: '数据更新失败' };
                        $scope.isCollapsed = false;
                    })
            }


            $scope.getone = function(){
                $http.get( '/admin/posts/edit/'+id )
                    .then(function(response) {
                        console.log(response );
                        if(response.data.status){
                            // console.log(response.data.data.posts_content);
                            $scope.posts=response.data.data;
                            $scope.posts.initproject=$scope.posts.project;
                            //$scope.websites=response.data.data.websites;
                            // $scope.projects=response.data.data.projects;

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