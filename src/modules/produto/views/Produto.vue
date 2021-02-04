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
                    <v-col cols="12" sm="8">
                        <v-text-field
                            label="Plano"
                            outlined
                            hide-details="auto"
                            v-model="pesquisa.plano"
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
                            @click="apagarProdutos()"
                        >
                            <v-icon> mdi-eraser </v-icon></v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-data-table
                            :headers="headers"
                            :items="produtos"
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
                                <v-tab key="Dados Básicos"> Dados </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item key="Dados Básicos">
                                    <v-card>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Código"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.id"
                                                        :disabled="true"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Plano"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.plano"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Subplano"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.subplano"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Valor"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.valor"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>                                                
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Início de Vigência"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.data_inicio_vigencia"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Fim de Vigência"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="produto.data_fim_vigencia"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-row
                                                class="mt-2 ml-2 pb-2 justify-center"
                                            >
                                                <v-btn
                                                    color="primary"
                                                    :disabled="
                                                        adicionarDesabilitado
                                                    "
                                                    :loading="adicionando"
                                                    @click="adicionar()"
                                                >
                                                    <v-icon left>
                                                        mdi-plus </v-icon
                                                    >{{ adicionarLabel }}</v-btn
                                                >
                                                <v-btn
                                                    class="ml-2"
                                                    color="primary"
                                                    :disabled="alterarDesabilitado"
                                                    :loading="alterando"
                                                    @click="alterar()"
                                                >
                                                    <v-icon left>
                                                        mdi-pencil </v-icon
                                                    >{{ alterarLabel }}
                                                </v-btn>
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
import ProdutoService from "./../services/";
import { mapActions } from "vuex";

export default {
    name: "Produto",
    title: "Gestão de Produto",
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

            alterarDesabilitado: true,
            adicionarDesabilitado: false,
            voltarDesabilitado: true,
            camposDesabilitados: true,

            tab: null,

            headers: [
                { text: "Código", value: "id" },
                { text: "Plano", value: "plano" },
                { text: "Subplano", value: "subplano" },
                { text: "Visualizar", value: "actions", sortable: false },
            ],

            produtos: [],
            produto: {  
                id: "",
                plano: "",
                subplano: "",
                valor: "",
                data_inicio_vigencia: "",
                data_fim_vigencia: ""
            },

            pesquisa: {
                codigo: "",
                plano: "",
                subplano: "",
            },
        };
    },

    methods: {
        pesquisar() {
            this.pesquisando = true;
            let self = this;
            ProdutoService.obter(this.clean(this.pesquisa))
                .then((response) => {
                    this.produtos = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.pesquisando = false;
                });
        },

        alterar() {
            this.alterando = true;
            let self = this;
            ProdutoService.alterar(this.produto)
                .then(() => {})
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.alterando = false;
                    self.alterarLabel = "Alterar";
                    self.alterarDesabilitado = true;
                    self.camposDesabilitados = true;
                    self.voltarDesabilitado = true;
                    self.adicionarDesabilitado = false;
                    self.apagarProduto();
                    self.apagarProdutos();
                });
        },

        adicionar() {
            if (this.adicionarLabel == "Adicionar") {
                this.adicionarLabel = "Salvar";
                this.voltarDesabilitado = false;
                this.camposDesabilitados = false;
            } else {
                this.adicionando = true;
                let self = this;
                ProdutoService.adicionar(this.produto)
                    .then(() => {})
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        self.adicionando = false;
                        self.adicionarLabel = "Adicionar";
                        self.camposDesabilitados = true;
                        self.voltarDesabilitado = true;
                        self.apagarProduto();
                    });
            }
        },

        transformarObjVueParaObjNormal(obj) {
            return Object.assign ({}, obj)
        },

        apagarProdutos() {
            this.produtos = [];
        },

        apagarProduto() {
            this.produto = {  
                id: "",
                plano: "",
                subplano: "",
                valor: "",
                data_inicio_vigencia: "",
                data_fim_vigencia: ""
            };
        },

        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },

        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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

        selecionar(produto) {
            this.produto.id = produto.id;
            this.produto.plano = produto.plano;
            this.produto.subplano = produto.subplano;
            this.produto.valor = produto.valor;
            this.produto.data_inicio_vigencia = produto.data_inicio_vigencia;
            this.produto.data_fim_vigencia = produto.data_fim_vigencia;
            this.alterarLabel = "Salvar";
            this.adicionarDesabilitado = true;
            this.alterarDesabilitado = false;
            this.voltarDesabilitado = false;
            this.camposDesabilitados = false;
        },

        voltar() {
            this.apagarProduto();
            this.adicionarLabel = "Adicionar";
            this.alterarLabel = "Alterar";
            this.adicionarDesabilitado = false;
            this.alterarDesabilitado = true;
            this.voltarDesabilitado = true;
            this.camposDesabilitados = true;
        },

        gerarStringUnica (tamanho) {
                var randomStr = '';
                var possibilidades = 'abcdefghijklmnopqrstuvwxyz';
                for (var i = 0; i < tamanho; i++) {
                    randomStr += possibilidades.charAt(Math.floor(Math.random() * possibilidades.length));
                }
                return randomStr;
        },

        ...mapActions(["setTitle"]),
    },

    created() {
        this.setTitle({ title: "Gestão de Produto" });
    }, 
};
</script>