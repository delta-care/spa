import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(async config => {
    await Vue.$keycloak.verifySession();
    config.headers.common['Authorization'] = `Bearer ${Vue.$keycloak.token}`;
    config.headers.common['Accept'] = 'application/json';
    config.headers.common['Content-Type'] = 'application/json';
    return config;
});