import { useState, useEffect } from 'react'
import blogServices from './services/blog'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  // 5.4 - Implement notifications that inform the user about 
  //       successful and unsuccessful operations at the top of the page.
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogServices.getAll().then(response => setBlogs(response.data))
  }, [refreshKey])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [refreshKey]) // doesn't refresh the page for some reason --> line 67

  // 5.2 - Make the login 'permanent' by using the local storage. 
  //       Also, implement a way to log out.
  const handleLogin = (event) => {
    event.preventDefault()
    try {
      blogServices.login(username, password)
                  .then(({ data }) => {
                    if (data) {
                      window.localStorage.setItem('loggedInUser', JSON.stringify(data))
                      setUser(data)
                    } else {
                      setNotification('wrong usernamr or password')
                      setTimeout(() => {
                        setNotification('')
                      }, 3000)
                    }
                  })
      
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  // 5.3 - Expand your application to allow a logged-in user to add 
  //       new blogs
  const addBlog = (event) => {
    event.preventDefault()
    try {
      blogServices.createBlog(user, title, author, likes, url).then(data => {
        console.log(data) 
        setNotification(data.data.title)
        setRefreshKey(oldState => oldState + 1)
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      setTimeout(() => {
        setNotification('')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      {user !== null && <button onClick={() => {
        setRefreshKey(oldState => oldState + 1)
        window.localStorage.clear()
      }}>logout</button> }
      <h1>Blogs App</h1>
      { user !== null && <h3>{ user.name } is logged in</h3> }
      { user === null ? 
      <Login 
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      /> :
      <NewBlog 
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        likes={likes}
        setLikes={setLikes}
      /> }
      <Blog blogs={blogs} />
    </>
  )
}

export default App
