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

const login = async () => {
    console.log('axios will log in shortly...')
}

export default {
    getAll,
    login
}