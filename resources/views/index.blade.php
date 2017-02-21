<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>小松API前台</title>
 
    <!-- Bootstrap -->
  <link rel="stylesheet" href="/app/libs/bootstrap-3.3.5-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="/app/front/css/simple-sidebar.css">
  <link rel="stylesheet" href="/app/front/css/font-awesome/css/font-awesome.css">
 
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body >
    <div ui-view></div>
    <script data-main="app/front/main" src="app/libs/require.js"></script>
  </body>
</html>