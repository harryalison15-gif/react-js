import { useEffect } from 'react'
import { useState } from 'react'
import { SquarePen ,Trash } from 'lucide-react';
const PostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('')
    const [editingPostId, setEditingPostId]=useState(null)
    const CreatePost = async () => {
        if (title.length !== 0 && content.length !== 0) {
            setError('')
            const postData = { title, content }
            try {
                await fetch('http://localhost:5000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }
                )
                setContent('')
                setTitle('')
                setError('')
                setConfirmMsg('Created sucessfully')
                setTimeout(() => {
                    setConfirmMsg('')
                }, 2000);
               fetchAllPosts()
            } catch (error) {
                setError('post not created')
            }

        } else {
            setError('Please Enter both title and description value')
        }
    }
        const UpdatePost = async () => {
        if (title.length !== 0 && content.length !== 0) {
            setError('')
            const postData = { title, content }
            try {
                await fetch(`http://localhost:5000/api/post/${editingPostId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }
                )
                setContent('')
                setTitle('')
                setError('')
                setConfirmMsg('updated sucessfully')
                setTimeout(() => {
                    setConfirmMsg('')
                }, 2000);
               fetchAllPosts()
            } catch (error) {
                setError('post not created')
            }

        } else {
            setError('Please Enter both title and description value')
        }
    }
    const fetchAllPosts = async () => {
        const res = await fetch('http://localhost:5000/api/posts')
        const data = await res.json();
        setPosts(data)
        console.log(data)
    }

    const deletePost = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/post/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            console.log(data)           
            fetchAllPosts()     
        } catch (error) {
            console.error('Failed to delete post')
        }
    }

    const startEdit =(post)=> {
        setEditingPostId(post._id);
        setTitle(post.title)
        setContent(post.content)
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <div className='w-xl h-full flex flex-col justify-center items-center'>
            <h3 className='font-bold text-gray-100 text-4xl mb-8 text-center'>HighGate</h3>
            <div className='flex flex-col w-full'>
                <input onChange={(e) => setTitle(e.target.value)} type='text' value={title} placeholder='Enter Title of post' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2'></input>
                <input onChange={(e) => setContent(e.target.value)} type='text' value={content} placeholder='Enter Content here' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2' ></input>
                <span className='text-red-600 mt-2'>{error}</span>
                <span className='text-green-600 mt-2'>{confirmMsg}</span>
                <button onClick={() => editingPostId ? UpdatePost() : CreatePost()} className='bg-gray-100 hover:bg-black hover:text-white transition-all rounded-full mt-4 py-2'>{editingPostId ? 'Update Post' : 'Create Post'}</button>
            </div>
            <div className='w-xl'>
                <div className='bg-gray-700 text-gray-300'>
                    {posts.map(post => (
                        <div className='bg-gray-800 my-8 flex justify-between border border-amber-600 rounded-xl py-2 px-4 w-full h-full' key={post._id}>
                            <div>
                                <h3 className='font-bold text-xl'>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                            <div>
                               <button onClick={()=>deletePost(post._id)}>
                                 <Trash />
                               </button>
                               <button onClick={()=>startEdit(post)}>
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