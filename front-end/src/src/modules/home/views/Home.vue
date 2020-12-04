<template>
    <v-app>
        <app-toolbar />
        <app-menu />
        <v-main>
            <v-container fluid>
                <h1>Home</h1>
            </v-container>
        </v-main>
        <v-footer app> </v-footer>
    </v-app>
</template>

<script>
import AppToolbar from "./../../../components/AppToolbar.vue";
import AppMenu from "./../../../components/AppMenu.vue";
import { mapActions } from "vuex";

export default {
    name: "Painel",
    components: {
        AppToolbar,
        AppMenu,
    },
    methods: {
        ...mapActions(["setTitle"]),
    },
    created() {
        this.setTitle({ title: "Home" });
    },
};
</script>