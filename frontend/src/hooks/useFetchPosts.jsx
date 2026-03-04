import { useState } from "react";
import { useEffect } from "react";

const useFetchPosts = (apiUrl) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
     const fetchPost = async () => {
            const res = await fetch(apiUrl)
            const data = await res.json();
            setPosts(data)
            console.log(data)
        }
    useEffect(() => {
        setLoading(true)
        fetchPost()
        setLoading(false)
    }, [])
    return { loading, posts ,fetchPost}
}

export default useFetchPosts