<template>
  <v-app>
    <app-toolbar />
    <app-menu />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import AppToolbar from "./AppToolbar.vue";
import AppMenu from "./AppMenu.vue";

export default {
  components: {
    AppToolbar,
    AppMenu,
  },
};
</script>