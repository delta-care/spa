<template>
    <v-app-bar
        app
        flat
        height="57px"
        style="border: 1px solid rgba(0, 0, 0, 0.12)"
    >
        <v-toolbar-title> DeltaCare</v-toolbar-title>

        <v-divider class="mx-4" vertical></v-divider>

        <span class="subheading">{{ "" || title }}</span>

        <v-spacer></v-spacer>

        <v-switch v-model="$vuetify.theme.dark" inset class="mt-6"></v-switch>

        <v-btn icon @click="showLogoutDialog = true">
            <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>

        <v-dialog v-model="showLogoutDialog" max-width="240">
            <v-card>
                <v-card-title class="headline">
                    Deseja realmente sair?
                </v-card-title>

                <v-card-text>
                    Alteração não salva será perdida, caso exista.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="showLogoutDialog = false"
                    >
                        Não
                    </v-btn>

                    <v-btn color="green darken-1" text @click="logout">
                        Sim
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';

export default {
    name: "AppToolbar",
    props: {
        show: Boolean,
    },
    model: {
        prop: "show",
        event: "hide",
    },
    data() {
        return {
            showLogoutDialog: false,
        };
    },
    computed: {
        ...mapState(["title"]),
    },
    methods: {
        logout() {
            Vue.$keycloak.logout();
        }
    },
};
</script>