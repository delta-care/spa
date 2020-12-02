import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

function login(usuario) {
  const params = {
    email: usuario.email,
    password: usuario.password,
  }
  return apiClient.get('/usuarios/', { params })
}

function obterUsuarioPorToken(token) {
  const params = {
    token: token,
  }
  return apiClient.get('/usuarios/', { params })
}

export default {
  login,
  obterUsuarioPorToken
}