import Vue from 'vue'
import Keycloak from 'keycloak-js'
import getEnv from '@/utils/env'

let initOptions = {
    url: getEnv('VUE_APP_KEYCLOAK_AUTH_URL'), 
    realm: getEnv('VUE_APP_KEYCLOAK_REALM'), 
    clientId: getEnv('VUE_APP_KEYCLOAK_CLIENT_ID')
}

Vue.$keycloak = Keycloak(initOptions);

Vue.$keycloak.verifySession = function() {
    let ssoSessionIdle = Math.round(
                            Vue.$keycloak.refreshTokenParsed.exp + 
                            Vue.$keycloak.timeSkew - new Date().getTime() / 1000);
    if (ssoSessionIdle < 0) 
        Vue.$keycloak.logout();
    else
        Vue.$keycloak.updateToken(getEnv('VUE_APP_KEYCLOAK_MINVALIDITY'));   
}