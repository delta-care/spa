import axios from 'axios'
import getEnv from '@/utils/env'

axios.interceptors.request.use(async config => {
    config.baseURL=getEnv('VUE_APP_EMPRESAS_API');
    return config;
});

function adicionar(dados) {
    return axios.post('/', dados)
}

function alterar(dados) {
    return axios.put('/' + dados.id, dados)
}

function obter(dados) {
    return axios.get('/', { params: dados } )
}

function excluir(dados) {
    return axios.delete('/' + dados.id, dados)
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}
