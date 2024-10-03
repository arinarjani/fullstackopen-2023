import { useState } from 'react'
import blogServices from '../services/blog'

const Blog = ( { blog, user, setRefreshKey } ) => {
  // state to control if the blog details are hidden or not with a boolean
  const [hidden, setHidden] = useState(true)
  // state to keep track of the likes per blog post
  const [likes, setLikes] = useState(blog.likes)
  
  // styles to show the blog details via HTML if hidden state 
  // is true or false
  const displayDetails = { display: '' }
  const hideDetails = { display: 'none' }
  
  // button to toggle between true or false for the hidden state
  const toggle = () => {
    setHidden(prevState => !prevState)
  }
    
  // CSS styles for Blog component
  const blogStyles = {
    borderBottom: '1px solid black',
    marginBottom: '1rem',
    padding: '1rem',
  }

  const increaseLikes = () => {
    setLikes(prevState => prevState + 1)
    setRefreshKey(prevState => prevState + 1)
    blogServices.increaseLikes(blog.id, blog, user)
  }

  const decreaseLikes = () => {
    setLikes(prevState => prevState - 1)
    blogServices.decreaseLikes(blog.id)
  }

  return (
    <div style={ blogStyles }>
      <h2>title: { blog.title } <button onClick={ toggle }>details</button></h2>
      <div style={ hidden ? hideDetails : displayDetails }>
        <p>Author: { blog.author }</p>
        <p>Likes: { likes } 
          <button 
            onClick={ increaseLikes }>
            +
          </button>
          <button onClick= { decreaseLikes }>
              -
          </button></p>
        <p>URL: { blog.url }</p>
        <p>user: { blog.user.username }</p>
      </div>
    </div>
  )
}

export default Blog