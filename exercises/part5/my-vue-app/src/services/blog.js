import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3003'


const getAll = async () => {
    try {
        const allBlogs = await axios.get('/api/blogs')
        return allBlogs
    } catch (error) {
        console.log(error)
    }
}

const login = async ( loginDetails ) => {
    try {
        const returnedUser = await axios.post('/api/login', loginDetails)
        return returnedUser
    } catch (err) {
        console.log(err)
        return err
    }
}

const createBlog = async ( blog ) => {
    try {
        const newBlog = await axios.post('/api/blogs', 
            blog,
            {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + blog.user.token
                 } 
            }
        )

        return newBlog
    } catch (error) {
        console.log(error)
    }
}

const increaseLikes = async ( id, blog ) => {
    // console.log('likes increased by one with the id of: ', id)
    try {
        await axios.put(`/api/blogs/${id}`, blog,
            {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + blog.user.token
                } 
            } 
        )
    } catch (error) {
        console.log('errrrrrrrrrrrr', error)
    }
}

const decreaseLikes = ( id ) => {
    console.log('decreased likes by one with the id of:', id)
}

export default {
    getAll,
    login,
    createBlog,
    increaseLikes,
    decreaseLikes
}