import { useState, useEffect } from 'react'
import blogServices from './services/blog'
import Blog from './components/Blog'
import Login from './components/Login'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // setBlogs(async () => await blog.getAll())
    // console.log(blogs);

    blogServices.getAll().then(response => setBlogs(response.data))
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    console.log(`username: ${username} and password: ${password}`);
  }

  return (
    <>
      <h1>Blogs App</h1>
      <Login 
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <Blog blogs={blogs} />
    </>
  )
}

export default App
