<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Post;
use App\Models\Website;
use App\Models\Project;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;

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
        $post = Post::leftJoin('websites', 'posts.website', '=', 'websites.websites_id')
            ->leftJoin('projects', 'posts.project', '=', 'projects.projects_id')
         ->orderby('posts_id','desc')->offset($current_page*$page)->limit($page);
        $posts['data']=$post->get();

        $posts['count'] =Post::count();
        $posts['pageSize']=$page;
        

        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(PostCreateRequest $request)
    {
        $data['posts_title'] = $request->input('posts_title');
        $data['posts_description'] = $request->input('posts_description');
        $data['website'] = $request->input('website');
        $data['project'] = $request->input('project');
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
        $data['data']['websites']=Website::orderby('websites_id','desc')->get();
        $data['data']['projects']=Project::orderby('projects_id','desc')->get();
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostUpdateRequest $request, $id)
    {
        $data=Post::where('posts_id',$id)->first();
        if($data){
            $posts['posts_title']=$request->input('posts_title');
            $posts['posts_description']=$request->input('posts_description');
            $posts['website']=$request->input('website');
            $posts['website']=$request->input('website');
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
    public function addshow(){
        //网站列表
        $data['websites']=Website::orderby('websites_id','desc')->get();
        $data['projects']=Project::orderby('projects_id','desc')->get();
        return response()->json(['status'=>true,'message'=>'数据查询成功','data'=>$data]);
    }
}
