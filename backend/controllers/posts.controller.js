import Post from "../models/posts.model.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({
            status: "success",
            post: post
        })
    } catch (error) {
        res.status(404).json({ message: "Post not found" });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { title: title, content: content } }
        )
        res.status(200).json({
            updatePost
        })
    } catch (error) {
        res.status(404).json({ message: "Post not update" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId)
        const result = await Post.findByIdAndDelete(postId)
        console.log(result)
        res.status(200).json({ message: 'Post deleted successfully', post: result })
    } catch (error) {
        res.status(404).json({ message: 'Post not deleted' })
    }
}
