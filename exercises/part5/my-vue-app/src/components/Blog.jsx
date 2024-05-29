import { useState } from 'react'
import blogServices from '../services/blog'

// the code below is the first try using Toggleable to have a hide/show
// btn for showing details of each blog. I was told not to use Toggleable
// , so I tried it with a btn for each blog item, but that made the button
// open all the blogs listed on the app due to each blog sharing one state
// if that makes sense. I re-wrote Blog to have each blog have it's own
// state, so now the btn works for each like the instructions stated

// const Blog = ({ blogs }) => {
  //   // state to control if the blog details are hidden or not with a boolean
  //   const [hidden, setHidden] = useState(true)

  //   // styles to show the blog details via HTML if hidden state 
//   // is true or false
//   const displayDetails = { display: '' }
//   const hideDetails = { display: 'none' }

//   // button to toggle between true or false for the hidden state
//   const toggle = () => {
//     setHidden(prevState => !prevState)
//   }

//   const BlogStyles = {
  //     borderBottom: '1px solid black',
  //     marginBottom: '1rem',
  //     padding: '1rem',
  //   }
//     return (
  //       <>
  //         {
    //           blogs.map((blog) => 
      //             <div style={BlogStyles}>
    //               <p key={blog.id}>Title: {blog.title} 
    //                 <button onClick={toggle}>{hidden ? 'view' : 'hide'}</button>
    //               </p>
    //               <div style={hidden ? hideDetails : displayDetails}>
    //                 <p>Author: {blog.author}</p>
    //                 <p>URL: {blog.url}</p>
    //                 <p>Likes: {blog.likes} <button>like</button></p>
    //               </div>
    //               {/* <Togglable btnLabel={"view"}>
    //                 <p>Author: {blog.author}</p>
    //                 <p>URL: {blog.url}</p>
    //                 <p>Likes: {blog.likes} <button>like</button></p>
  //               </Togglable> */}
  
  //             </div>
  //           )
  //         }
  //       </>
  //     )
  //   }


// 5.7: add a button to each blog, which controls whether all of the 
//      details about the blog are shown or not. The Like button doesn't 
//      have to do anything yet
const Blog = ( { blog } ) => {
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

  return (
    <div style={ blogStyles }>
      <h2>title: { blog.title } <button onClick={ toggle }>details</button></h2>
      <div style={ hidden ? hideDetails : displayDetails }>
        <p>Author: { blog.author }</p>
        <p>Likes: { blog.likes } 
          <button 
            onClick={ blogServices.increaseLikes }>
            +
          </button>
          <button onClick= { blogServices.decreaseLikes }>
              -
          </button></p>
        <p>URL: { blog.url }</p>
      </div>
    </div>
  )
}

export default Blog