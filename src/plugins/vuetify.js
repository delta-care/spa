import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: false },
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
