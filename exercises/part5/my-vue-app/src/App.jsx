import { useState, useEffect, useRef } from 'react'
import blogServices from './services/blog'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  console.log('blogs', blogs)
  const [loginVisible, setLoginVisible] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [notification, setNotification] = useState('')
  const blogFormRef = useRef()
  
  const styles = {
    main: {
      display: loginVisible ? '' : 'none'
    }
  }

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

  const handleLogin = (loginDetails) => {
    // event.preventDefault()
    try {
      blogServices.login(loginDetails)
                  .then(({ data }) => {
                    if (data) {
                      window.localStorage.setItem('loggedInUser', JSON.stringify(data))
                      setUser(data)
                    } else {
                      setNotification('wrong username or password')
                      setTimeout(() => {
                        setNotification('')
                      }, 3000)
                    }
                  })
    } catch (err) {
      console.log(err)
    }
  }

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogServices.createBlog(blog).then(data => {
        // console.log(data) 
        setNotification(`${data.data.title} added`)
        setRefreshKey(oldState => oldState + 1)
      })
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
      {user && <button onClick={() => {
        setRefreshKey(oldState => oldState + 1)
        window.localStorage.clear()
      }}>logout</button> }
      <h1>Blogs App</h1>
      { user && <h3>{ user.name } is logged in</h3> }
      
      { user === null ? 
      <>
        <Togglable btnLabel={'login'}>
          <Login
            handleLogin={handleLogin}
          /> 
        </Togglable>
      </> 
        :
      <Togglable btnLabel={'add blog'} ref={blogFormRef}>
        <NewBlog
          addBlog={addBlog}
          user={user}
        />
        {blogs.map(blog => 
          <Blog blog={blog} />
        )}
      </Togglable>
      }
    </>
  )
}

export default App
