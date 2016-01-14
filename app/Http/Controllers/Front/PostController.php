<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Website;
use App\Models\Project;
use App\Models\Post;


class PostController extends Controller
{
    public function nav(){
        $website_to_project=array();
        $websites=Website::get();
        if($websites){
            foreach($websites as $key=>$val){
                $websites_array[$val['websites_id']]=$val['websites_name'];
            }
        }

        $projects=Project::get();
        if($projects){
            foreach($projects as $key=>$val){
                $projects_array[$val['projects_id']]=$val['projects_name'];
            }
        }

        $posts=Post::select('website','project')->orderby("website","asc")->orderby("project","asc")->get();

        if($posts){
           foreach($posts as $key=>$val){
                $website_to_project[$val['website']]['websites_name']=$websites_array[$val['website']];
                $website_to_project[$val['website']]['projects_name'][$val['project']]=$projects_array[$val['project']];
           } 
        }
        return response()->json($website_to_project);
    }
    public function postslist($wid,$pid){

         $posts=Post::leftJoin('websites', 'posts.website', '=', 'websites.websites_id')
            ->leftJoin('projects', 'posts.project', '=', 'projects.projects_id')->where('website',$wid)->where('project',$pid)->orderby("posts_id","desc")->get();
         return response()->json($posts);
    }
    public function alllist(){

         $posts=Post::leftJoin('websites', 'posts.website', '=', 'websites.websites_id')
            ->leftJoin('projects', 'posts.project', '=', 'projects.projects_id')->orderby("posts_id","desc")->get();
         return response()->json($posts);
    }

    public function posts($id){
        $posts=Post::leftJoin('websites', 'posts.website', '=', 'websites.websites_id')
            ->leftJoin('projects', 'posts.project', '=', 'projects.projects_id')->where('posts_id',$id)->first();
        return response()->json($posts);
    }
}
