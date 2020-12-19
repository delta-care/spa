import axios from 'axios'
import getEnv from '@/utils/env'

const apiClient = axios.create({
  baseURL: getEnv('VUE_APP_USUARIO_API'),
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