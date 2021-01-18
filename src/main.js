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
        Vue.$keycloak.loadUserInfo().success(function setUserInfo(userInfo) {
            Vue.$keycloak.userInfo = userInfo;
            console.log(Vue.$keycloak);
            renderApp();
            //setVerifySessionOnFocus();
            //Vue.$keycloak.debugToken();
        });
    })
    
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
