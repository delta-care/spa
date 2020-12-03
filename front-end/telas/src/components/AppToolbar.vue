<template>
  <v-app-bar
    app
    flat
    height="57px"
    style="border: 1px solid rgba(0, 0, 0, 0.12)"
  >
    <v-toolbar-title> DeltaCare</v-toolbar-title>

    <v-divider class="mx-4" vertical></v-divider>

    <span class="subheading"></span>

    <v-spacer></v-spacer>

    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      class="mt-6"
    ></v-switch>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppToolbar",
  props: {
    show: Boolean,
  },
  model: {
    prop: "show",
    event: "hide",
  },
};
</script>