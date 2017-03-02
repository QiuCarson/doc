<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});
/*
Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);*/

Route::get('/admin', ['as' =>'admin','uses'=>'Admin\HomeController@index']);

Route::post('/auth/login', ['uses'=>'Admin\HomeController@postLogin']);

Route::get('/auth/logout', ['uses'=>'Admin\HomeController@getLogout']);

Route::group(['prefix' => 'admin','namespace' => 'Admin','middleware' => 'auth'],function(){

    
    Route::group(['prefix' => 'posts'], function () {
        //Route::get('/list/{current_page}', 'PostController@index');
        Route::post('/list', 'PostController@index');
        /*->where('current_page', '\d+');*/
        Route::post('/list/search', 'PostController@index');
        Route::get('/delete/{id}', 'PostController@delete');
        Route::post('/create', 'PostController@create');
        Route::get('/edit/{id}', 'PostController@edit');
        Route::put('/edit/{id}', 'PostController@update');
        Route::delete('/delete/{id}', 'PostController@delete');
        Route::get('/addshow', 'PostController@addshow');

    });

    Route::group(['prefix' => 'websites'], function () {
        Route::get('/list/{current_page}', 'WebsiteController@index');

        /*->where('current_page', '\d+');*/
        Route::get('/delete/{id}', 'WebsiteController@delete');
        Route::post('/create', 'WebsiteController@create');
        Route::get('/edit/{id}', 'WebsiteController@edit');
        Route::put('/edit/{id}', 'WebsiteController@update');
        Route::delete('/delete/{id}', 'WebsiteController@delete');       

    });

    Route::group(['prefix' => 'projects'], function () {
        Route::get('/list/{current_page}', 'ProjectsController@index');
        /*->where('current_page', '\d+');*/
        Route::get('/delete/{id}', 'ProjectsController@delete');
        Route::post('/create', 'ProjectsController@create');
        Route::get('/edit/{id}', 'ProjectsController@edit');
        Route::put('/edit/{id}', 'ProjectsController@update');
        Route::delete('/delete/{id}', 'ProjectsController@delete');

    });
});

/*****************前台路由**********************/
 Route::group(['prefix' => 'front','namespace' => 'Front'], function () {
    Route::get('/nav', 'PostController@nav');
    Route::get('/alllist', 'PostController@alllist');
    Route::get('/list/{wid}/{pid}', 'PostController@postslist');
    Route::post('/posts', 'PostController@posts');
 });


/*
Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
*/

