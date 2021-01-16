import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify';
import vuelidate from '@/plugins/vuelidate';
import title from '@/mixins/title'
import '@/injects/keycloak';
import '@/injects/axios';

Vue.config.productionTip = false
Vue.mixin(title)

Vue.$keycloak.init({ onLoad: 'login-required' })
    .success(() => {
        let userInfoLoaded = Vue.$keycloak.loadUserInfo().success(setUserInfo);
        let userProfileLoaded = Vue.$keycloak.loadUserProfile().success(setUserProfile);
        
        Promise.all([userInfoLoaded, userProfileLoaded]).then(() => {
            renderApp();
            setVerifySessionOnFocus();
            Vue.$keycloak.debugToken();
          });
    })

function setUserInfo(userInfo) {
    Vue.$keycloak.userInfo = userInfo;
}

function setUserProfile(userProfile) {
    Vue.$keycloak.userProfile = userProfile;
}

function renderApp() {
    new Vue({
        router,
        store,
        vuetify,
        vuelidate,
        render: h => h(App)
    }).$mount('#app');
}

function setVerifySessionOnFocus() {
    window.onfocus = () => {
        Vue.$keycloak.verifySession();
    };
}