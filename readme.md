doc系统，自己学习用的，目前项目还在开发中

安装

composer install

php artisan migrate 添加表

要给目录权限不然程序会500错误

2016-01-18 这个系统基本完成，只能说可以用了


创建测试数据
php artisan make:seeder UserTableSeeder

php artisan make:seeder ProjectTableSeeder
php artisan make:seeder WebsiteTableSeeder

添加测试数据

php artisan db:seed

添加单个数据

php artisan db:seed  --class=PostTableSeeder

V2.0版本修改

使用requestjs 控制器分多个文件

后台

http://www.XXXX.com/admin

测试账号 admin@qq.com 密码 123456


前台

http://www.XXXX.com/



