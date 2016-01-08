
angular.module("myApp.Controllers", ["ui.router"])
.controller('SigninController',['$scope','$http','$state',function($scope, $http, $state){

              $scope.login = function() {
                 $http.post( '/auth/login', {email: $scope.user.email, password: $scope.user.password})
                  .then(function(response) {
                    //console.log(response);
                    if ( !response.data.status ) {
                      $scope.message = response.data.message;
                    }else{
                        $scope.success = '登陆成功';
                        $state.go('main.dashboard');
                    }
                  }, function(x) {
                    $scope.message = '用户名或密码不正确！';
                  });
             }
           
}])

/********************接口********************/
.controller('PostsListController',['$scope','$http','$state',function($scope, $http, $state){
                $scope.currentPage = 1;
                $scope.load=function(){
                    $http.get( '/admin/posts/list/'+$scope.currentPage)
                        .then(function(response) {
                       
                        $scope.list=response.data.data; 
                        $scope.count = response.data.count; 
                        $scope.pageSize=response.data.pageSize; 
                        $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);   
                        // console.log($scope.totalPage );
                        //生成数字链接
                        //$scope.pageLength=$scope.totalPage>5?5:$scope.totalPage;

                        if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                            
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage
                            ];
                        }
                    });
                }
                $scope.load();
                $scope.next = function () {                    
                    if ($scope.currentPage < $scope.totalPage) {
                        $scope.currentPage++;
                        $scope.load();
                    }
                };

                $scope.prev = function () {
                    if ($scope.currentPage > 1) {$scope.currentPage--;$scope.load();}
                };

                $scope.loadPage = function (page) {
                    $scope.currentPage = page;$scope.load();
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
.controller('PostsAddController',['$scope','$http','$state',function($scope, $http, $state){
   
                $scope.create = function(){
                    $http.post( '/admin/posts/create', {
                        posts_title: $scope.posts.posts_title, 
                        posts_category1: $scope.posts.posts_category1,
                        posts_category2: $scope.posts.posts_category2, 
                        posts_description: $scope.posts.posts_description, 
                        posts_content: $scope.posts.posts_content, 
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.posts.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
                        })
                }
            
 }]) 
.controller('PostsEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

                $scope.edit = function(){
                    $http.put( '/admin/posts/edit/'+id, {
                        posts_title: $scope.posts.posts_title, 
                        posts_category1: $scope.posts.posts_category1,
                        posts_category2: $scope.posts.posts_category2, 
                        posts_description: $scope.posts.posts_description, 
                        posts_content: $scope.posts.posts_content,                         
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.posts.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
                        })
                }
                
                
                $scope.getone = function(){
                    $http.get( '/admin/posts/edit/'+id )
                    .then(function(response) {
                        console.log(response );
                        if(response.data.status){
                           // console.log(response.data.data.posts_content);
                            $scope.posts=response.data.data;                            
                        }                        
                    })
                }
                $scope.getone(); 
 }]) 
/********************网站********************/
.controller('WebsitesListController',['$scope','$http','$state',function($scope, $http, $state){
                $scope.currentPage = 1;
                $scope.load=function(){
                    $http.get( '/admin/websites/list/'+$scope.currentPage)
                        .then(function(response) {
                       
                        $scope.list=response.data.data; 
                        $scope.count = response.data.count; 
                        $scope.pageSize=response.data.pageSize; 
                        $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);   
                        // console.log($scope.totalPage );
                        //生成数字链接
                        //$scope.pageLength=$scope.totalPage>5?5:$scope.totalPage;

                        if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                            
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage
                            ];
                        }
                    });
                }
                $scope.load();
                $scope.next = function () {                    
                    if ($scope.currentPage < $scope.totalPage) {
                        $scope.currentPage++;
                        $scope.load();
                    }
                };

                $scope.prev = function () {
                    if ($scope.currentPage > 1) {$scope.currentPage--;$scope.load();}
                };

                $scope.loadPage = function (page) {
                    $scope.currentPage = page;$scope.load();
                };
                
                $scope.deleted =function(id){
                    if(!confirm("确定删除？")){
                        return false;
                    }else{
                        //console.log(id);
                        $http.delete( '/admin/websites/delete/'+id.id)
                        .then(function(response) {
                            if ( response.data.status ) {
                                 $state.go('main.websites.list',{},{ reload: true });
                            }                          

                        });
                    }
                };                
            
}])
.controller('WebsitesAddController',['$scope','$http','$state',function($scope, $http, $state){
   
                $scope.create = function(){
                    $http.post( '/admin/websites/create', {
                        websites_name: $scope.websites.websites_name, 
                        
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.websites.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
                        })
                }
            
 }]) 
.controller('WebsitesEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

                $scope.edit = function(){
                    $http.put( '/admin/websites/edit/'+id, {
                        websites_name: $scope.websites.websites_name, 
                                                
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.websites.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
                        })
                }
                
                
                $scope.getone = function(){
                    $http.get( '/admin/websites/edit/'+id )
                    .then(function(response) {
                        console.log(response );
                        if(response.data.status){
                           // console.log(response.data.data.posts_content);
                            $scope.websites=response.data.data;                            
                        }                        
                    })
                }
                $scope.getone(); 
 }]) 
/********************项目********************/
.controller('ProjectsListController',['$scope','$http','$state',function($scope, $http, $state){
                $scope.currentPage = 1;
                $scope.load=function(){
                    $http.get( '/admin/projects/list/'+$scope.currentPage)
                        .then(function(response) {
                       
                        $scope.list=response.data.data; 
                        $scope.count = response.data.count; 
                        $scope.pageSize=response.data.pageSize; 
                        $scope.totalPage = Math.ceil($scope.count / $scope.pageSize);   
                        // console.log($scope.totalPage );
                        //生成数字链接
                        //$scope.pageLength=$scope.totalPage>5?5:$scope.totalPage;

                        if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                            
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage,
                                $scope.currentPage + 1
                            ];
                        } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                            $scope.pages = [
                                $scope.currentPage - 1,
                                $scope.currentPage
                            ];
                        }
                    });
                }
                $scope.load();
                $scope.next = function () {                    
                    if ($scope.currentPage < $scope.totalPage) {
                        $scope.currentPage++;
                        $scope.load();
                    }
                };

                $scope.prev = function () {
                    if ($scope.currentPage > 1) {$scope.currentPage--;$scope.load();}
                };

                $scope.loadPage = function (page) {
                    $scope.currentPage = page;$scope.load();
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
.controller('ProjectsAddController',['$scope','$http','$state',function($scope, $http, $state){
   
                $scope.create = function(){
                    $http.post( '/admin/projects/create', {
                        projects_name: $scope.projects.projects_name, 
                        
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.websites.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
                        })
                }
            
 }]) 
.controller('ProjectsEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

                $scope.edit = function(){
                    $http.put( '/admin/projects/edit/'+id, {
                        projects_name: $scope.projects.projects_name, 
                                                
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                $scope.message = response.data.message;
                            }else{
                                $scope.success = '数据插入成功';
                                $state.go('main.websites.list');
                            }
                        }, function(x) {
                            $scope.message = '数据插入失败';
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
                $scope.getone(); 
 }]) 
