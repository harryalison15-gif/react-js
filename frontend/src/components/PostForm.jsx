import { useState } from 'react'
import { SquarePen, Trash } from 'lucide-react';
import {useFetchPosts ,useCreatePost ,useDeletePost,useUpdatePost} from '../hooks/index'

const PostForm = () => {
    const {loading,posts,fetchPost} = useFetchPosts( import.meta.env.VITE_API_URL+'/posts')
    const {error,confirmMsg,CreatePost} = useCreatePost(fetchPost)
    const {UpdatePost} = useUpdatePost(fetchPost)
    const {deletePost} = useDeletePost(fetchPost)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editingPostId, setEditingPostId] = useState(null);
    
    const handlePostsCreate =async()=> {
       const success = await CreatePost({title,content})
       if(success){
        setContent('')
        setTitle('')
       }
    }

    const handleUpdatePost = async () => {
        const success = await UpdatePost({title,content,editingPostId})
        if(success){
            setContent('')
            setTitle('')
        }
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
                <span className='text-red-600 mt-2'>{error}</span>
                <span className='text-green-600 mt-2'>{confirmMsg}</span>
                <button onClick={() => editingPostId ? handleUpdatePost() : handlePostsCreate()} className='bg-gray-100 hover:bg-black hover:text-white transition-all rounded-full mt-4 py-2'>{editingPostId ? 'Update Post' : 'Create Post'}</button>
            </div>
            <div className='w-xl'>
                <div className='bg-gray-700 text-gray-300'>
                    {loading ? "loading posts" : posts.map(post => (
                        <div className='bg-gray-800 my-8 flex justify-between border border-amber-600 rounded-xl py-2 px-4 w-full h-full' key={post._id}>
                            <div>
                                <h3 className='font-bold text-xl'>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                            <div>
                                <button onClick={() => deletePost(post._id)}>
                                    <Trash />
                                </button>
                                <button onClick={() => startEdit(post)}>
                                    <SquarePen />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostForm

