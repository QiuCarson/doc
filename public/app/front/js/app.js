
var template_admin_base_url="/app/front/tpl/";

var myApp = angular.module("myApp", [
    "ui.router",
    "myApp.Controllers",
    ])
.run(
    //获得当前状态的方法，绑到根作用域 http://www.tuicool.com/articles/zeiy6ff
    //$rootScope 根，$state 不是什么，$stateParams区分url参数，
         [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                //$rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                
            }
          ]
    )
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/");
     $stateProvider
        .state('index', {
                url: '/',
                templateUrl: template_admin_base_url+"index.html",
                controller: 'IndexController', 
        })
})