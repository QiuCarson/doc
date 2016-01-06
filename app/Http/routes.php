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
    return view('welcome');
});
/*
Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);*/

Route::get('/admin', ['as' =>'admin','uses'=>'Admin\HomeController@index']);

Route::post('/auth/login', ['uses'=>'Admin\HomeController@postLogin']);

Route::group(['prefix' => 'admin','namespace' => 'Admin','middleware' => 'auth'],function(){

    
    Route::group(['prefix' => 'posts'], function () {
        Route::get('/list/{current_page}', 'PostController@index');
        /*->where('current_page', '\d+');*/
        Route::get('/delete/{id}', 'PostController@delete');
    });
});

/*
Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
*/

