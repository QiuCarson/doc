<?php

use Illuminate\Database\Seeder;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=0;$i<50;$i++){
            DB::table('posts')->insert([
            'posts_title' => str_random(10),
            'posts_description'=>str_random(10),
            'posts_category1'=>1,
            'posts_category2'=>2,
            'posts_content' => str_random(100),            
        ]);
        }
        
    }
}
