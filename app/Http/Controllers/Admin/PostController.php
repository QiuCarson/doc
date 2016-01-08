<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Post;

class PostController extends Controller
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
        $post = Post::orderby('posts_id','desc')->offset($current_page*$page)->limit($page);
        $posts['data']=$post->get();

        $posts['count'] =Post::count();
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
        $data['posts_title'] = $request->input('posts_title');
        $data['posts_description'] = $request->input('posts_description');
        $data['posts_category1'] = $request->input('posts_category1');
        $data['posts_category2'] = $request->input('posts_category2');
        $data['posts_content'] = $request->input('posts_content');

        $id=Post::insertGetId($data);
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
        $data['data']=Post::where('posts_id',$id)->first();
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
        $data=Post::where('posts_id',$id)->first();
        if($data){
            $posts['posts_title']=$request->input('posts_title');
            $posts['posts_description']=$request->input('posts_description');
            $posts['posts_category1']=$request->input('posts_category1');
            $posts['posts_category2']=$request->input('posts_category2');
            $posts['posts_content']=$request->input('posts_content');

            $flag=Post::where('posts_id',$id)->update($posts);
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
        
        
        $flag=Post::where('posts_id',$id)->delete();
        if($flag){
                return response()->json(['status'=>true,'message'=>'数据删除成功']);
        }else{
            return response()->json(['status'=>false,'message'=>'数据删除失败']);
        }
    }
}
