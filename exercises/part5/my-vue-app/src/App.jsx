import { useState, useEffect, useRef } from 'react'
import blogServices from './services/blog'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

function App() {
  // PART 5.B.STATE OF THE FORM
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  console.log('blogs', blogs)
  // PART 5.B.STATE OF THE FORM
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  // const [likes, setLikes] = useState(0)
  const [loginVisible, setLoginVisible] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  // 5.4 - Implement notifications that inform the user about 
  //       successful and unsuccessful operations at the top of the page.
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

  // 5.2 - Make the login 'permanent' by using the local storage. 
  //       Also, implement a way to log out.
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
      // PART 5.B.STATE OF THE FORM
      // setUsername('')
      // setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  // 5.3 - Expand your application to allow a logged-in user to add bew blogs
  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogServices.createBlog(blog).then(data => {
        console.log(data) 
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
  // PART 5.B.STATE OF THE FORM
  // const addBlog = (event) => {
  //   event.preventDefault()
  //   try {
  //     blogServices.createBlog(user, title, author, likes, url).then(data => {
  //       console.log(data) 
  //       setNotification(`${data.data.title} added`)
  //       setRefreshKey(oldState => oldState + 1)
  //     })
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     setLikes('')
  //     setTimeout(() => {
  //       setNotification('')
  //     }, 3000)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
            // username={username}
            // setUsername={setUsername}
            // password={password}
            // setPassword={setPassword}
          /> 
        </Togglable>
      </> 
        :
      <Togglable btnLabel={'add blog'} ref={blogFormRef}>
        <NewBlog
          addBlog={addBlog}
          user={user}
        />
        {/* PART 5.B.STATE OF THE FORM 
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
        />  */}
        {/* <Blog blogs={blogs} /> */}
        {blogs.map(blog => 
          <Blog blog={blog} />
        )}
      </Togglable>
      }
    </>
  )
}

export default App
