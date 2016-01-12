<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class PostUpdateRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'posts_title' => 'required',
            'website'=>'required|integer|min:1',
            'project'=>'required|integer|min:1'
            
        ];
    }

    public function messages(){
        return [
            'posts_title.required' =>json_encode( ['status'=>false,'message'=>'标题必须填'],JSON_UNESCAPED_UNICODE),
            'website.required' => json_encode(['status'=>false,'message'=>'网站必须选'],JSON_UNESCAPED_UNICODE),
            'website.min' => json_encode(['status'=>false,'message'=>'网站必须选'],JSON_UNESCAPED_UNICODE),
            'project.required' => json_encode(['status'=>false,'message'=>'项目必须选'],JSON_UNESCAPED_UNICODE),
            'project.min' => json_encode(['status'=>false,'message'=>'项目必须选'],JSON_UNESCAPED_UNICODE),            
        ];
    }
}
