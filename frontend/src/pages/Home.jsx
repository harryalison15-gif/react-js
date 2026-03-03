import { useEffect, useState } from 'react'
import PostForm from '../components/PostForm';

const Home = () => {
  const [message, setMessage] = useState('')
  const FetchData = async () => {
    const response = await fetch('http://localhost:5000/api/welcome');
    const data = await response.json()
    console.log(data.message)
    setMessage(data.message)
  }
  useEffect(() => {
    FetchData()
  }, [])
  return (
    <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
       <PostForm/>
    </div>
  )
}

export default Home