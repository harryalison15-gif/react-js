import { useEffect, useState } from 'react'

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
    <div className='w-screen h-screen flex items-center justify-center'>
      <h1 className='font-bold text-3xl'>{message}</h1>
    </div>
  )
}

export default Home