import { useState } from 'react'
import {  useCreatePost, useUpdatePost } from '../hooks/index'
import PostListing from './PostListing';

const PostForm = () => {
   
    const { mutate: createMutate } = useCreatePost();
    const { mutate: updateMutate } = useUpdatePost();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editingPostId, setEditingPostId] = useState(null);

    const handlePostsCreate = () => {
        createMutate({ title, content });
    }

    const handleUpdatePost = async () => {
        console.log(editingPostId)
        const id = editingPostId
        const post = {title,content}
        updateMutate({id,post})
    }
    
    const startEdit = (post) => {
        setEditingPostId(post._id);
        setTitle(post.title)
        setContent(post.content)
    }

    return (
        <div className='w-xl h-full flex flex-col justify-center items-center'>
            <h3 className='font-bold text-gray-100 text-4xl mb-8 text-center'>HighGate</h3>
            <div className='flex flex-col w-full'>
                <input onChange={(e) => setTitle(e.target.value)} type='text' value={title} placeholder='Enter Title of post' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2'></input>
                <input onChange={(e) => setContent(e.target.value)} type='text' value={content} placeholder='Enter Content here' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2' ></input>
                <button onClick={() => editingPostId ? handleUpdatePost() : handlePostsCreate()} className='bg-gray-100 hover:bg-black hover:text-white transition-all rounded-full mt-4 py-2'>{editingPostId ? 'Update Post' : 'Create Post'}</button>
            </div>
            <PostListing startEdit={startEdit}/>
        </div>
    )
}

export default PostForm

