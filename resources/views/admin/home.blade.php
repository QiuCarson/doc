<!DOCTYPE html>
<html lang="zh-CN" ng-app='myApp'>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>后台管理</title>
 
    <!-- Bootstrap -->
  <link rel="stylesheet" href="/models/bootstrap-3.3.5-dist/css/bootstrap.min.css">
 
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body >
    <div ui-view></div>
   <script src="/models/jquery/jquery.min.js"></script>

    <script src="/models/angularjs/angular.min.js"></script>
    <script src="/models/angularjs/angular-ui-router.min.js"></script>
    <script src="/models/angularjs/angular-messages.js"></script>
    <script src="/models/angularjs/tm.pagination.js"></script>
    
  <script src="/models/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
  
  <!--编辑器-->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/trix/0.9.2/trix.css">

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/trix/0.9.2/trix.js"></script>
<script src="/models/angular-trix-master/dist/angular-trix.min.js"></script>



   <script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var base_url = '<?php echo route("admin") ?>';
   var is_login = '<?php echo (new App\Models\User)->isAdminLogin() ?>';
    </script>
   <script src="/static/js/app.js"></script>
<script>
  

</script>
 
  <script src="/static/js/controllers.js"></script>
  </body>
</html>