import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_EMPRESA_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

function adicionar(dados) {
    return api.post('/empresas/', dados)
}

function alterar(dados) {
    return api.patch('/empresas/' + dados.id, dados)
}

function obter(dados) {
    return api.get('/empresas/', { params: dados } )
}

function excluir(dados) {
    return api.delete('/empresas/' + dados.id, dados)
}

export default {
    adicionar,
    alterar,
    obter,
    excluir
}