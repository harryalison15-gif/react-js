import { useState } from "react";

const useUpdatePost = (fetchPost) => {
    const [error, setError] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('')
    const UpdatePost = async ({ title, content , editingPostId }) => {
        if (title.length !== 0 && content.length !== 0) {
            setError('')
            const postData = { title, content }
            try {
                await fetch(import.meta.env.VITE_API_URL+`/post/${editingPostId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }
                )
                setError('')
                setConfirmMsg('updated sucessfully')
                setTimeout(() => {
                    setConfirmMsg('')
                }, 2000);
                fetchPost()

            } catch (error) {
                setError('post not created')
            }
            return true
        } else {
            setError('Please Enter both title and description value')
        }
    }
    return { UpdatePost, error, confirmMsg }
}

export default useUpdatePost