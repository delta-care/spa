<template>
    <v-navigation-drawer :mini-variant.sync="mini" app>
        <v-list-item class="px-2">
            <v-list-item-avatar>
                <v-img src="@/assets/dt-logo.png" style="height: 35px"></v-img>
            </v-list-item-avatar>

            <v-list-item-title></v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
            <v-list-item
                v-for="tela in telasAutorizadas"
                :key="tela.title"
                link
                :to="tela.path"
            >
                <v-list-item-icon>
                    <v-icon>{{ tela.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ tela.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Vue from "vue";

export default {
    name: "AppMenu",
    data: () => ({
        mini: true,
        telas: [
            {
                title: "Home",
                icon: "mdi-view-dashboard",
                path: "/home",
                exact: true,
            },
            {
                title: "Painel",
                icon: "mdi-chart-box",
                path: "/painel",
                exact: true,
            },
            {
                title: "Produto",
                icon: "mdi-book-outline",
                path: "/produto",
                exact: true,
            },
            {
                title: "Empresa",
                icon: "mdi-domain",
                path: "/empresa",
                exact: true,
            },
            {
                title: "Fatura",
                icon: "mdi-cash",
                path: "/fatura",
                exact: true,
            }
        ],
    }),
    computed: {
        telasAutorizadas: function () {
            //return this.telas;
            let telasAutorizadasNoKeyCloak = Vue.$keycloak.tokenParsed.realm_access.roles;
            return this.telas.filter(function (tela) {
                return telasAutorizadasNoKeyCloak.includes(tela.title.toLowerCase());
            });
        },
    },
};
</script>