import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data)
                .catch(err => console.log(err))
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
                .then(response => response.data)
                .catch(err => console.log(err));
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePhoneNumber = (id, updatedNumber) => {
    return axios.put(`${baseUrl}/${id}`, updatedNumber)
                .then(response => response.data)
}

export default { 
  getAll,
  create,
  deletePerson,
  updatePhoneNumber
}