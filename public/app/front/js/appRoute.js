/**
 * 路由
 */

var template_admin_base_url="/app/front/tpl/";
define(['app'], function(app){

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/index");
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: template_admin_base_url+"index.html",
                controller: 'indexController',
            })
            .state('index.alllist', {
                url: '/alllist',
                templateUrl: template_admin_base_url+"alllist.html",
                controller: 'alllistController',
            })
            .state('index.list', {
                url: '/list/{wid:[0-9]+}/{pid:[0-9]+}',
                templateUrl: template_admin_base_url+"list.html",
                controller: 'listController',
            })
            .state('index.posts', {
                url: '/posts/{id:[0-9]+}',
                templateUrl: template_admin_base_url+"posts.html",
                controller: 'postsController',
            })
    })
  
})