import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

function obterEmpresas(params) {
  return apiClient.get('/empresas/', { params })
}

export default {
    obterEmpresas
}