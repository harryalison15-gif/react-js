import { useState } from "react";

const useCreatePost = (fetchPost) => {
    const [error, setError] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('')
    const CreatePost = async ({ title, content }) => {
        if (title.length !== 0 && content.length !== 0) {
            setError('')
            const postData = { title, content }
            try {
                await fetch(import.meta.env.VITE_API_URL + '/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                }
                )
                setError('')
                setConfirmMsg('Created sucessfully')
                setTimeout(() => {
                    setConfirmMsg('')
                }, 2000);
                fetchPost()
            } catch (error) {
                setError('post not created')
            }

        } else {
            setError('Please Enter both title and description value')
        }
        return true
    }
    return { error, confirmMsg, CreatePost }
}
export default useCreatePost