import { useState } from 'react'
import blogServices from '../services/blog'

const Blog = ( { blog, user } ) => {
  console.log('blog', blog)

  // state to control if the blog details are hidden or not with a boolean
  const [hidden, setHidden] = useState(true)
  
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
      blogServices.increaseLikes(blog.id, blog, user)
    }

    const decreaseLikes = () => {
      blogServices.decreaseLikes(blog.id)
    }

  return (
    <div style={ blogStyles }>
      <h2>title: { blog.title } <button onClick={ toggle }>details</button></h2>
      <div style={ hidden ? hideDetails : displayDetails }>
        <p>Author: { blog.author }</p>
        <p>Likes: { blog.likes } 
          <button 
            onClick={ increaseLikes }>
            +
          </button>
          <button onClick= { decreaseLikes }>
              -
          </button></p>
        <p>URL: { blog.url }</p>
      </div>
    </div>
  )
}

export default Blog