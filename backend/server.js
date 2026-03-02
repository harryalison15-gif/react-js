import express from 'express'
import cors from 'cors'
const app = express()
const port = 5000

app.use(cors());

app.get('/api/welcome', (req, res) => {
  res.json({
    message:"Hello! My MERN Internship has started."
  })
})

app.listen(port, () => {
  console.log(`backend is running on the following port ${port}`)
})
