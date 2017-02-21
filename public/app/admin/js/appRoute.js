/**
 * 路由
 */

var default_tpl = is_login?'app/dashboard':'auth/signin';

var admin_url = base_url;

var template_admin_base_url="/app/admin/tpl/";

var template_admin_base_css_url="/app/admin/css/";

if(!is_login){
    window.location.href=base_url+'#auth/signin';
}else{
    window.location.href=base_url+'#main/dashboard';
}
define(['app'], function(app){

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "auth/signin");
        //$urlRouterProvider.otherwise(default_tpl);

        $stateProvider
            .state('auth', {
                url: '/auth',
                template: '<div ui-view class="container"></div>',
            })
            .state("auth.signin", {
                url:"/signin",
                templateUrl: template_admin_base_url+"auth/signin.html",
                controller: 'signinController',

            })

            .state('main', {
                url: '/main',
                templateUrl: template_admin_base_url+'main.html'
            })
            .state('main.dashboard', {
                url: '/dashboard',
                templateUrl: template_admin_base_url+'dashboard.html'
            })
            /********************接口********************/
            .state("main.posts", {
                url:"/posts",
                templateUrl: template_admin_base_url+'posts/index.html'
            })
            .state("main.posts.list", {
                url:"/list",
                templateUrl: template_admin_base_url+'posts/list.html',
                controller: 'postsListController',

            })
            .state("main.posts.add", {
                url:"/add",
                templateUrl: template_admin_base_url+'posts/add.html',
                controller: 'postsAddController',

            })
            .state("main.posts.edit", {
                url:"/edit/{id:[0-9]+}",
                templateUrl: template_admin_base_url+'posts/edit.html',
                controller: 'postsEditController',

            })
            /********************网站********************/
            .state("main.websites", {
                url:"/websites",
                templateUrl: template_admin_base_url+'websites/index.html'
            })
            .state("main.websites.list", {
                url:"/list",
                templateUrl: template_admin_base_url+'websites/list.html',
                controller: 'websitesListController',

            })
            .state("main.websites.add", {
                url:"/add",
                templateUrl: template_admin_base_url+'websites/add.html',
                controller: 'websitesAddController',

            })
            .state("main.websites.edit", {
                url:"/edit/{id:[0-9]+}",
                templateUrl: template_admin_base_url+'websites/edit.html',
                controller: 'websitesEditController',

            })
            /********************网站********************/
            .state("main.projects", {
                url:"/projects",
                templateUrl: template_admin_base_url+'projects/index.html'
            })
            .state("main.projects.list", {
                url:"/list",
                templateUrl: template_admin_base_url+'projects/list.html',
                controller: 'projectsListController',

            })
            .state("main.projects.add", {
                url:"/add",
                templateUrl: template_admin_base_url+'projects/add.html',
                controller: 'projectsAddController',

            })
            .state("main.projects.edit", {
                url:"/edit/{id:[0-9]+}",
                templateUrl: template_admin_base_url+'projects/edit.html',
                controller: 'projectsEditController',

            })
    })
  
})