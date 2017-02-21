/*requirejs 配置
* requerejs 参数说明url https://www.phpsong.com/1697.html
* 官方网站 http://www.requirejs.cn/
* baseUrl 说明：默认加载js件的目录如上面的加载angular，jquery 的目录为js目录下面
* paths 说明：配置要加载的js文件，如：angular: ‘libs/angular’,angular相当于定义了一个名字，加载/assets/js/libs/angular.js
* shim 说明： shim为了RequireJS能加载非AMD规范的模块（目前我没有搞懂什么是非AMD规范的模块） .deps参数表示依赖，如上面代码 deps: [‘jquery’] 表示angular要依赖jquery，exports值（输出的变量名），表明这个模块外部调用时的名称
* */

require.config({
    //baseUrl: "js/",
    paths: {
        "jquery": "../libs/jquery.min",
        "angular" : "../libs/angularjs/angular.min",
        "angular-route" : "../libs/angularjs/angular-ui-router.min",
        "angular-messages":"../libs/angularjs/angular-messages",
        "angular-pagination":"../libs/angularjs/tm.pagination",
        "angular-bootstrap":"../libs/angularjs/ui-bootstrap-tpls-1.0.3.min",

        "trix":"../libs/angular-trix-master/dist/trix",
        "angular-trix":"../libs/angular-trix-master/dist/angular-trix.min",

        "route" : "js/appRoute",


        "app" : "controllers/app",
        "websitesController" : "controllers/websitesController",
        "signinController" : "controllers/signinController",
        "projectsController" : "controllers/projectsController",
        "postsController" : "controllers/postsController",
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'angular-pagination':{
            deps: ["angular"],
            exports: 'angular-pagination'
        },
        'angular-messages':{
            deps: ["angular"],
            exports: 'angular-messages'
        },
        'angular-bootstrap':{
            deps: ["angular"],
            exports: 'angular-bootstrap'
        },
        'angular-trix':{
            deps: ["angular",'trix'],
            exports: 'angular-trix'
        },
    }
})

require(['jquery',
    'angular',
    'angular-route',
    'app',
    'route',
    'websitesController',
    'signinController',
    'projectsController',
    'postsController',
    'angular-messages',
    'angular-pagination',
    'trix',
    'angular-bootstrap',
    'trix',
    'angular-trix'
],function ($,angular){

    $(function () {
        //angular.bootstrap只会绑定第一次加载的对象
        angular.bootstrap(document,["docApp"]);
    })

});


