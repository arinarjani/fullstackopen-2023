import axios from 'axios'
const baseUrl = '/api/persons'

// 2.13 - Extract the code that handles the communication with the backend 
//        into its own module by following the example shown earlier in this part of the course material.

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data)
                .catch(err => console.log(err))
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
                .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePhoneNumber = (id, updatedNumber) => {
    return axios.put(`${baseUrl}/${id}`, updatedNumber)
                .then(response => response.data)
                .catch(err => console.log(err))
}

export default { 
  getAll,
  create,
  deletePerson,
  updatePhoneNumber
}