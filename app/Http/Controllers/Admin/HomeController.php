<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;


class HomeController extends Controller
{
     protected $redirectAfterLogout = '/admin';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.home');
    }

    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials))
        {
            return response()->json(['status'=>true,'message'=>'登陆成功']);
        }
        return response()->json(['status'=>false,'message'=>'登陆失败']);
        //return Response::json($credentials);
        /*return redirect($this->loginPath())
                    ->withInput($request->only('email'))
                    ->withErrors([
                        'email' => 'These credentials do not match our records.',
                    ]);*/
    }

    public function getLogout(){
        Auth::logout();
        return redirect('/admin');
    }

    
}
