import axios from 'axios'
import getEnv from '@/utils/env'

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
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}