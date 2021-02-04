import axios from 'axios'
import getEnv from '@/utils/env'

const baseURL = getEnv('VUE_APP_PRODUTOS_API');

function adicionar(dados) {
    return axios.post(baseURL + '/', dados)
}

function alterar(dados) {
    return axios.put(baseURL + '/', dados)
}

function obter(dados) {
    return axios.get(baseURL + '/', { params: dados } )
}

function excluir(dados) {
    return axios.delete(baseURL + '/' + dados.id, dados)
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}
