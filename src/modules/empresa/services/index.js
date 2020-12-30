import axios from 'axios'
import getEnv from '@/utils/env'

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
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}
