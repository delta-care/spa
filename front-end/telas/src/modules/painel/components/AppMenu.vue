<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    permanent
    absolute
    app
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="@/assets/dt-logo.png" style="height:35px"></v-img>
      </v-list-item-avatar>

      <v-list-item-title></v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list >
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppMenu",
  data: () => ({
    mini: true,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        url: "/painel",
        exact: true,
      },
      { title: "Photos", icon: "mdi-image", url: "/painel", exact: true },
      { title: "About", icon: "mdi-help-box", url: "/painel", exact: true },
    ],
  }),
};
</script>