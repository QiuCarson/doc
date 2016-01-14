
angular.module("myApp.Controllers", [
    "ui.router",
    "ui.bootstrap",
    ])
.controller('mainleft', function ($scope) {

})
.controller('SigninController',['$scope','$http','$state',function($scope, $http, $state){

              $scope.login = function() {
                 $http.post( '/auth/login', {email: $scope.user.email, password: $scope.user.password})
                  .then(function(response) {
                    //console.log(response);
                    if ( !response.data.status ) {
                        $scope.alert = {type: 'danger', msg: response.data.message };
                        $scope.isCollapsed = false;
                      //$scope.message = response.data.message;
                    }else{
                        $scope.success = '登陆成功';
                        $state.go('main.dashboard');
                    }
                  }, function(x) {
                    //$scope.message = '用户名或密码不正确！';
                    $scope.alert = {type: 'danger', msg: '用户名或密码不正确' };
                    $scope.isCollapsed = false;
                  });
             }

            $scope.closeAlert = function() {
                $scope.isCollapsed = true;
            };
            $scope.isCollapsed = true;
           
}])

/********************接口********************/
.controller('PostsListController',['$scope','$http','$state',function($scope, $http, $state){
                $scope.currentPage = 1;
                
                $scope.maxSize=5;
                $scope.load=function(){
                    $http.get( '/admin/posts/list/'+$scope.currentPage)
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
                
               $scope.pageChanged = function() {
                    $scope.load();
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
                                console.log(response.data.data.posts_content);
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
.controller('PostsEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

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
/********************网站********************/
.controller('WebsitesListController',['$scope','$http','$state',function($scope, $http, $state){
                $scope.currentPage = 1;
                $scope.maxSize=5;
                $scope.load=function(){
                    $http.get( '/admin/websites/list/'+$scope.currentPage)
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
                                //$scope.message = response.data.message;
                                $scope.alert = {type: 'danger', msg: response.data.message };
                                $scope.isCollapsed = false;
                            }else{
                                //$scope.success = '数据插入成功';
                                $scope.alert = {type: 'success', msg: '数据插入成功' };
                                $scope.isCollapsed = false;
                                $state.go('main.websites.list');
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
.controller('WebsitesEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

                $scope.edit = function(){
                    $http.put( '/admin/websites/edit/'+id, {
                        websites_name: $scope.websites.websites_name, 
                                                
                    })
                  .then(function(response) {
                            if ( !response.data.status ) {
                                //$scope.message = response.data.message;
                                $scope.alert = {type: 'danger', msg: response.data.message };
                                $scope.isCollapsed = false;
                            }else{
                                //$scope.success = '数据插入成功';
                                $scope.alert = {type: 'success', msg: '数据修改成功' };
                                $scope.isCollapsed = false;
                                $state.go('main.websites.list');
                            }
                        }, function(x) {
                            //$scope.message = '数据插入失败';
                            $scope.alert = {type: 'danger', msg: '数据更新失败' };
                            $scope.isCollapsed = false;
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
                $scope.closeAlert = function() {
                    $scope.isCollapsed = true;
                };
                $scope.isCollapsed = true;
                $scope.getone(); 
 }]) 
/********************项目********************/
.controller('ProjectsListController',['$scope','$http','$state',function($scope, $http, $state){
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
.controller('ProjectsAddController',['$scope','$http','$state',function($scope, $http, $state){
   
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
                                $state.go('main.products.list');
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
.controller('ProjectsEditController',['$scope','$http','$state',function($scope, $http, $state){
               var id=$scope.$stateParams.id;

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
