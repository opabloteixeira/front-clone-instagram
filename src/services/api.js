import axios from 'axios'

export const url = 'http://localhost:3334' 

const api = axios.create({
    baseURL: url
})


export default api


