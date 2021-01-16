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
    .success((auth) => {
        if(!auth) {
            window.location.reload();
        }
        new Vue({
            router,
            store,
            vuetify,
            vuelidate,
            render: h => h(App)
        }).$mount('#app')

        window.onfocus = () => {
            Vue.$keycloak.verifySession();
        };

        // setInterval(() =>{
        //     let refresh_expires = Math.round(Vue.$keycloak.refreshTokenParsed.exp + Vue.$keycloak.timeSkew - new Date().getTime() / 1000);
        //     console.log(Vue.$keycloak);
        //     console.log('>>> Token expires in ' + Math.round(Vue.$keycloak.tokenParsed.exp + Vue.$keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        //     console.log('>>> Refresh Expires in ' + refresh_expires + ' seconds');
        // }, 5000);

    })