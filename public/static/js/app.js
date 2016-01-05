
var default_tpl = is_login?'app/dashboard':'auth/signin';

var admin_url = base_url;

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
 
     //$urlRouterProvider.when("", "/PageTab");
    $urlRouterProvider.otherwise(default_tpl);

     $stateProvider
        .state("auth", {
            url: "/auth",
            templateUrl: "test.html"
        })
        .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "Page1.html"
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
