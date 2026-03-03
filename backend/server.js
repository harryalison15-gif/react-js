import express from 'express'
import cors from 'cors'
import { createPost, deletePost, getPostById, getPosts, updatePost } from './controllers/posts.controller.js'
import mongoose from 'mongoose'

const app = express()
const port = 5000
const databaseUrl = 'mongodb://127.0.0.1:27017/tkhighgate'

app.use(cors());
app.use(express.json())
app.get('/api/welcome', (req, res) => {
  res.json({
    message: "Hello! My MERN Internship has started."
  })
})

app.get('/api/posts', getPosts);
app.get('/api/post/:id', getPostById);
app.post('/api/posts', createPost);
app.patch('/api/post/:id', updatePost);
app.delete('/api/post/:id', deletePost);

app.listen(port, async () => {
  await mongoose.connect(databaseUrl)
  console.log(`backend is running on the following port ${port}`)
})
