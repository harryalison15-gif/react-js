import api from "./apiClient";


export const fetchPosts = async () => {
  const {data} = await api.get('/posts')
  return data
}

export const createPost = async (post) => {
    const {data} = await api.post('/posts',post);
    return data
}

export const deletePost = async (id) => {
    const {data} = await api.delete(`/post/${id}`);
    return data
}

export const updatePost = async ({ id , post }) => {
    const {data} = await api.patch(`/post/${id}`,post);
    return data
}
