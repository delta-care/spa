<template>
    <v-app>
        <app-toolbar />
        <app-menu />
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="2">
                        <v-text-field
                            label="Código"
                            outlined
                            hide-details="auto"
                            v-model="pesquisa.codigo"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field
                            label="CNPJ"
                            outlined
                            hide-details="auto"
                            v-model="pesquisa.cnpj"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field
                            label="Nome"
                            outlined
                            hide-details="auto"
                            v-model="pesquisa.nome"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1">
                        <v-btn
                            color="primary ml-4"
                            fab
                            hide-details="auto"
                            @click="pesquisar()"
                            :loading="pesquisando"
                        >
                            <v-icon> mdi-account-search </v-icon></v-btn
                        >
                    </v-col>
                    <v-col cols="12" sm="1">
                        <v-btn
                            color="primary"
                            fab
                            hide-details="auto"
                            @click="apagarEmpresas()"
                        >
                            <v-icon> mdi-eraser </v-icon></v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-data-table
                            :headers="headers"
                            :items="empresas"
                            :items-per-page="5"
                            :loading="pesquisando"
                            sort-by="id"
                            class="elevation-2"
                        >
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="ml-3" @click="selecionar(item)">
                                    mdi-eye-outline
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-card>
                            <v-tabs
                                v-model="tab"
                                background-color="primary"
                                dark
                            >
                                <v-tab key="Dados"> Faturas </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item key="Dados">
                                    <v-card>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Código"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.id"
                                                        :disabled="true"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="CNPJ"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.cnpj"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field
                                                        label="Nome"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.nome"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Email"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.email"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" sm="12">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-left">
                                                                        Código
                                                                    </th>
                                                                    <th class="text-left">
                                                                        Mês
                                                                    </th>
                                                                    <th class="text-left">
                                                                        Documento
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                v-for="fatura in empresa.faturas"
                                                                :key="fatura.id"
                                                                >
                                                                <td>{{ fatura.id }}</td>
                                                                <td>{{ fatura.mes }}</td>
                                                                <td><a :href=fatura.documento target="_blank">{{ fatura.documento }}</a></td>
                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-row
                                                class="mt-2 ml-2 pb-2 justify-center"
                                            >
                                                <v-btn
                                                    class="ml-2"
                                                    :disabled="voltarDesabilitado"
                                                    color="primary"
                                                    @click="voltar()"
                                                >
                                                    <v-icon left>
                                                        mdi-undo-variant </v-icon
                                                    >voltar</v-btn
                                                >
                                            </v-row>
                                        </v-card-actions>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer app> </v-footer>
    </v-app>
</template>

<script>
import AppToolbar from "./../../../components/AppToolbar.vue";
import AppMenu from "./../../../components/AppMenu.vue";
import FaturaService from "./../services/";
import { mapActions } from "vuex";

export default {
    name: "Fatura",
    title: "Gestão de Fatura",
    components: {
        AppToolbar,
        AppMenu,
    },

    data() {
        return {
            adicionarLabel: "Adicionar",
            alterarLabel: "Alterar",

            pesquisando: false,
            alterando: false,
            adicionando: false,
            excluindo: false,

            alterarDesabilitado: true,
            adicionarDesabilitado: false,
            voltarDesabilitado: true,
            camposDesabilitados: true,

            tab: null,

            headers: [
                { text: "Código", value: "id" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Nome", value: "nome" },
                { text: "Faturas", value: "faturas.qtd" },
                { text: "Visualizar", value: "actions", sortable: false },
            ],

            empresas: [],
            empresa: {  
                id: "",
                cnpj: "",
                nome: "",
                email: "",
                faturas: []
            },

            pesquisa: {
                codigo: "",
                cnpj: "",
            },
        };
    },

    methods: {
        pesquisar() {
            this.pesquisando = true;
            let self = this;
            FaturaService.obter(this.clean(this.pesquisa))
                .then((response) => {
                    this.empresas = response.data;
                    this.empresas.forEach(empresa => {
                        empresa.faturas.qtd = empresa.faturas.length;
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.pesquisando = false;
                });
        },

        apagarEmpresas() {
            this.empresas = [];
        },

        apagarEmpresa() {
            this.empresa = {
                id: "",
                cnpj: "",
                nome: "",
                email: "",
                faturas: [],
            };
        },

        clean(obj) {
            let retorno = {};
            for (var propName in obj) {
                if (
                    !(
                        obj[propName] === null ||
                        obj[propName] === undefined ||
                        obj[propName] == ""
                    )
                ) {
                    retorno[propName] = obj[propName];
                }
            }
            return retorno;
        },

        selecionar(empresa) {
            let self = this;
            this.empresa.id = empresa.id;
            this.empresa.cnpj = empresa.cnpj;
            this.empresa.nome = empresa.nome;
            this.empresa.email = empresa.email;
            this.empresa.faturas = [];
            empresa.faturas.forEach(fatura => { 
                fatura.mes=self.primeiroCaracterMaiusculo(fatura.mes);
                self.empresa.faturas.push(fatura); 
            });
            this.voltarDesabilitado = false;
            this.camposDesabilitados = true;
        },

        voltar() {
            this.apagarEmpresa();
            this.adicionarLabel = "Adicionar";
            this.alterarLabel = "Alterar";
            this.adicionarDesabilitado = false;
            this.alterarDesabilitado = true;
            this.voltarDesabilitado = true;
            this.camposDesabilitados = true;
        },

        primeiroCaracterMaiusculo(palavra) {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        },

        ...mapActions(["setTitle"]),
    },

    created() {
        this.setTitle({ title: "Gestão de Fatura" });
    }, 
};
</script>