import axios from 'axios'
import getEnv from '@/utils/env'

const baseURL = getEnv('VUE_APP_PAINEL_API');

function obter(dados) {
    return axios.get(baseURL + '/', { params: dados } );
}

export default {
    obter,
}
