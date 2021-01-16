import axios from 'axios'
import getEnv from '@/utils/env'

<<<<<<< HEAD
axios.interceptors.request.use(async config => {
    config.baseURL=getEnv('VUE_APP_EMPRESA_API');
    return config;
});

function adicionar(dados) {
    return axios.post('/empresas/', dados)
}

function alterar(dados) {
    return axios.patch('/empresas/' + dados.id, dados)
}

function obter(dados) {
    return axios.get('/empresas/', { params: dados } )
}

function excluir(dados) {
    return axios.delete('/empresas/' + dados.id, dados)
=======
const api = axios.create({
    baseURL: getEnv('VUE_APP_EMPRESA_API'),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

function adicionar(dados) {
    return api.post('/', dados)
}

function alterar(dados) {
    return api.put('/' + dados.id, dados)
}

function obter(dados) {
    return api.get('/', { params: dados } )
}

function excluir(dados) {
    return api.delete('/' + dados.id, dados)
>>>>>>> 958e9f082f4f6d5c6b794f17ce27a4dc305568da
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}
