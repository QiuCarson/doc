<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Website;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($current_page)
    {
        
        $current_page=$current_page?$current_page:1;
        $current_page=$current_page-1;

        $page=10;
        //echo $current_page*$page;exit;
        $post = Website::orderby('websites_id','desc')->offset($current_page*$page)->limit($page);
        $posts['data']=$post->get();

        $posts['count'] =Website::count();
        $posts['pageSize']=$page;
        $posts['pageSize']=$page;

        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data['websites_name'] = $request->input('websites_name');
        if($this->check_repeat($data['websites_name'])){
                return response()->json(['status'=>false,'message'=>'网站已经存在']);
                exit;
        }
        $id=Website::insertGetId($data);
        if($id){
            return response()->json(['status'=>true,'message'=>'数据插入成功','data'=>$data]);
        }else{
            return response()->json(['status'=>false,'message'=>'数据插入失败']);
        }
    }

    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data['data']=Website::where('websites_id',$id)->first();
        if($data['data']){
            $data['status']=true;
        }else{
            $data['status']=false;
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data=Website::where('websites_id',$id)->first();
        if($data){
            $posts['websites_name']=$request->input('websites_name');
            if($this->check_repeat($posts['websites_name'])){
                return response()->json(['status'=>false,'message'=>'网站已经存在']);
                exit;
            }

            $flag=Website::where('websites_id',$id)->update($posts);
            if($flag){
                return response()->json(['status'=>true,'message'=>'数据修改成功']);
            }else{
                return response()->json(['status'=>false,'message'=>'数据修改失败']);
            }
        }
        return response()->json(['status'=>false,'message'=>'数据修改失败']);
    }
        

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {       
        
        $flag=Website::where('websites_id',$id)->delete();
        if($flag){
                return response()->json(['status'=>true,'message'=>'数据删除成功']);
        }else{
            return response()->json(['status'=>false,'message'=>'数据删除失败']);
        }
    }

    private function check_repeat($websites_name){
        $websites=Website::where('websites_name',$websites_name)->count();

        if($websites){
            return true;            
        }
    }
}
