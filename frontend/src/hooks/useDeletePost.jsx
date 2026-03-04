const useDeletePost = (fetchPost) => {
    const deletePost = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL+`/post/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            console.log(data)
            fetchPost()
        } catch (error) {
            console.error('Failed to delete post')
        }
    }
    return { deletePost }
}
export default useDeletePost