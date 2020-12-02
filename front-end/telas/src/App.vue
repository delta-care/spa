<template>
  <v-app>
    <app-toolbar />
    <app-menu />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import AppToolbar from "./components/AppToolbar.vue";
import AppMenu from "./components/AppMenu.vue";

export default {
  name: "App",

  components: {
    AppToolbar,
    AppMenu,
  },

  data: () => ({
    //
  }),
};
</script>

