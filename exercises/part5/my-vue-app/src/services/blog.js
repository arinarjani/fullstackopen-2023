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

const login = async ( username, password ) => {
    try {
        const returnedUser = await axios.post('/api/login', { username, password })
        return returnedUser
    } catch (err) {
        console.log(err)
    }
}

const createBlog = async ( user, title, author, likes, url ) => {
    try {
        const newBlog = await axios.post('/api/blogs', 
            {
                title,
                author,
                likes,
                url
            },
            {  headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + user.token
            } }
        )

        return newBlog
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAll,
    login,
    createBlog
}