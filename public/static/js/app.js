
var default_tpl = is_login?'app/dashboard':'auth/signin';

var admin_url = base_url;

var template_admin_base_url="/app/admin/tpl/";

var template_admin_base_css_url="/app/admin/css/";

if(!is_login){
    //window.location.href=base_url+'#auth/signin';
}
var myApp = angular.module("myApp", ["ui.router"])
.run(
    //获得当前状态的方法，绑到根作用域 http://www.tuicool.com/articles/zeiy6ff
    //$rootScope 根，$state 不是什么，$stateParams区分url参数，
         [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
          ]
    )
.config(function ($stateProvider, $urlRouterProvider) {
 
     $urlRouterProvider.when("", "auth/signin");
    //$urlRouterProvider.otherwise(default_tpl);

     $stateProvider
        
        .state("signin", {
            url:"/auth/signin",
            templateUrl: template_admin_base_url+"auth/signin.html",
            controller: function($scope, $http, $state) {
                $scope.login = function() {
                 $http.post( '/auth/login', {email: $scope.user.email, password: $scope.user.password})
                  .then(function(response) {
                    if ( !response.data.status ) {
                      $scope.message = response.data.message;
                    }else{
                        $scope.success = '登陆成功';
                        $state.go('dashboard');
                    }
                  }, function(x) {
                    $scope.message = '用户名或密码不正确！';
                  });
             }
            }
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "Page2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "Page3.html"
        });
});


/*
var app = angular.module('myApp',[
    'ui.router'
    ])
.run(
    //获得当前状态的方法，绑到根作用域 http://www.tuicool.com/articles/zeiy6ff
    //$rootScope 根，$state 不是什么，$stateParams区分url参数，
         [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
          ]
    )
.config(
    //路由重定向
    [          '$stateProvider', '$urlRouterProvider','$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider) {
        $urlRouterProvider
            .otherwise(default_tpl);


    }]
);*/
