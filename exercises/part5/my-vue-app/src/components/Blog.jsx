const Blog = ({ blogs }) => {
    return (
      <>
        {
          blogs.map((blog) => 
            <>
              <p key={blog.id}>{blog.title} - {blog.author}</p>
            </>
          )
        }
      </>
    )
  }

  export default Blog