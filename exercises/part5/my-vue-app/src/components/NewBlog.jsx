import { useState } from 'react'

const NewBlog = ( { addBlog, user } ) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const createBlog = (event) => {
        event.preventDefault()
        addBlog( {user , title, author, likes, url} )

        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }

    return (
        <form onSubmit={createBlog}>
            <div>
                <label htmlFor="Title">
                    Title:
                </label>
                <input 
                    type="text" 
                    name="Title" 
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                />
            </div>
            <div>
                <label htmlFor="Author">
                    Author:
                </label>
                <input 
                    type="text" 
                    name="Author" 
                    value={author}
                    onChange={ (e) => setAuthor(e.target.value) }
                />
            </div>
            <div>
                <label htmlFor="Url">
                    Url:
                </label>
                <input 
                    type="text" 
                    name="Url" 
                    value={url}
                    onChange={ (e) => setUrl(e.target.value) }
                />
            </div>
            <div>
                <label htmlFor="Likes">
                    Likes:
                </label>
                <input 
                    type="number" 
                    name="Likes" 
                    value={likes}
                    onChange={ (e) => setLikes(e.target.value) }
                />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

// const NewBlog = (
//     { 
//         addBlog, 
//         title, 
//         setTitle, 
//         author, 
//         setAuthor, 
//         url, 
//         setUrl, 
//         likes, 
//         setLikes }
//     ) => {
//     return (
//         <form onSubmit={addBlog}>
//             <div>
//                 <label htmlFor="Title">
//                     Title:
//                 </label>
//                 <input 
//                     type="text" 
//                     name="Title" 
//                     value={title}
//                     onChange={ (e) => setTitle(e.target.value) }
//                 />
//             </div>
//             <div>
//                 <label htmlFor="Author">
//                     Author:
//                 </label>
//                 <input 
//                     type="text" 
//                     name="Author" 
//                     value={author}
//                     onChange={ (e) => setAuthor(e.target.value) }
//                 />
//             </div>
//             <div>
//                 <label htmlFor="Url">
//                     Url:
//                 </label>
//                 <input 
//                     type="text" 
//                     name="Url" 
//                     value={url}
//                     onChange={ (e) => setUrl(e.target.value) }
//                 />
//             </div>
//             <div>
//                 <label htmlFor="Likes">
//                     Likes:
//                 </label>
//                 <input 
//                     type="number" 
//                     name="Likes" 
//                     value={likes}
//                     onChange={ (e) => setLikes(e.target.value) }
//                 />
//             </div>
//             <button type="submit">save</button>
//         </form>
//     )
// }

export default NewBlog