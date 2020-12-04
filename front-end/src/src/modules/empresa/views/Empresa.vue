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
                            v-model="pesquisa.id"
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
                            @click="apagar()"
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
                                <v-icon class="ml-3" @click="selecionado(item)">
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
                                <v-tab key="Dados Básicos">
                                    Dados Básicos
                                </v-tab>
                                <v-tab key="Produtos e Coberturas">
                                    Produtos e Coberturas
                                </v-tab>
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
                                                        v-model="empresa.id"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field
                                                        label="CNPJ"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.cnpj"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-menu
                                                        ref="menuDataAdmissao2"
                                                        v-model="
                                                            menuDataAdmissao2
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    dataAdmissaoFormatada2
                                                                "
                                                                label="Data Admissão"
                                                                persistent-hint
                                                                v-bind="attrs"
                                                                @blur="
                                                                    dataAdmissao2 = parseDate(
                                                                        dataAdmissaoFormatada2
                                                                    )
                                                                "
                                                                v-on="on"
                                                                outlined
                                                                hide-details="auto"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                dataAdmissao2
                                                            "
                                                            no-title
                                                            @input="
                                                                menuDataAdmissao2 = false
                                                            "
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-combobox
                                                        outlined
                                                        label="Filial Cont."
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-combobox
                                                        outlined
                                                        label="Administ."
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field
                                                        label="Nome"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.nome"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-combobox
                                                        outlined
                                                        label="UF"
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="C.E.I"
                                                        outlined
                                                        hide-details="auto"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Inscrição Municipal"
                                                        outlined
                                                        hide-details="auto"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="CEP"
                                                        outlined
                                                        hide-details="auto"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field
                                                        label="Logradouro"
                                                        outlined
                                                        hide-details="auto"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Bairro"
                                                        outlined
                                                        hide-details="auto"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Email"
                                                        outlined
                                                        hide-details="auto"
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
                                                    :loading="adicionando"
                                                    @click="adicionar()"
                                                >
                                                    <v-icon left>
                                                        mdi-plus </v-icon
                                                    >Adicionar</v-btn
                                                >
                                                <v-btn
                                                    class="ml-2"
                                                    color="primary"
                                                    :loading="salvando"
                                                    @click="alterar()"
                                                >
                                                    <v-icon left>
                                                        mdi-pencil </v-icon
                                                    >Alterar
                                                </v-btn>
                                                <v-btn
                                                    class="ml-2"
                                                    color="primary"
                                                    :loading="excluindo"
                                                    @click="excluir()"
                                                >
                                                    <v-icon left>
                                                        mdi-delete </v-icon
                                                    >Excluir</v-btn
                                                >
                                            </v-row>
                                        </v-card-actions>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item key="Produtos e Coberturas">
                                    <v-card>
                                        <v-card-text class="pt-6">
                                            <h2>Produto</h2>
                                            <v-divider class="mt-2"></v-divider>
                                            <v-row class="mt-2">
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Plano"
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Plano"
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-combobox
                                                        outlined
                                                        label="Versão"
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-menu
                                                        ref="dataVigenciaInicioMenu"
                                                        v-model="
                                                            dataVigenciaInicioMenu
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    dataVigenciaInicioFormatada
                                                                "
                                                                label="Início de Vigência"
                                                                persistent-hint
                                                                v-bind="attrs"
                                                                @blur="
                                                                    dataVigenciaInicio = parseDate(
                                                                        dataVigenciaInicioFormatada
                                                                    )
                                                                "
                                                                v-on="on"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                dataVigenciaInicio
                                                            "
                                                            no-title
                                                            @input="
                                                                dataVigenciaInicioMenu = false
                                                            "
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-menu
                                                        ref="dataVigenciaFimMenu"
                                                        v-model="
                                                            dataVigenciaFimMenu
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    dataVigenciaFimFormatada
                                                                "
                                                                label="Fim de Vigência"
                                                                persistent-hint
                                                                v-bind="attrs"
                                                                @blur="
                                                                    dataVigenciaFim = parseDate(
                                                                        dataVigenciaFimFormatada
                                                                    )
                                                                "
                                                                v-on="on"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                dataVigenciaFim
                                                            "
                                                            no-title
                                                            @input="
                                                                dataVigenciaFimMenu = false
                                                            "
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>

                                            <h2>Coberturas</h2>
                                            <v-divider class="mt-2"></v-divider>
                                            <v-row class="mt-2">
                                                <v-col cols="12" sm="6">
                                                    <v-combobox
                                                        outlined
                                                        label="Benefício"
                                                        hide-details="auto"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-menu
                                                        ref="dataVigenciaInicioCoberturaMenu"
                                                        v-model="
                                                            dataVigenciaInicioCoberturaMenu
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    dataVigenciaInicioCoberturaFormatada
                                                                "
                                                                label="Início de Vigência"
                                                                persistent-hint
                                                                v-bind="attrs"
                                                                @blur="
                                                                    dataVigenciaInicioCobertura = parseDate(
                                                                        dataVigenciaInicioCoberturaFormatada
                                                                    )
                                                                "
                                                                v-on="on"
                                                                outlined
                                                                hide-details="auto"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                dataVigenciaInicioCobertura
                                                            "
                                                            no-title
                                                            @input="
                                                                dataVigenciaInicioCoberturaMenu = false
                                                            "
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-menu
                                                        ref="dataVigenciaFimCoberturaMenu"
                                                        v-model="
                                                            dataVigenciaFimCoberturaMenu
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    dataVigenciaFimCoberturaFormatada
                                                                "
                                                                label="Fim de Vigência"
                                                                persistent-hint
                                                                v-bind="attrs"
                                                                @blur="
                                                                    dataVigenciaFimCobertura = parseDate(
                                                                        dataVigenciaFimCoberturaFormatada
                                                                    )
                                                                "
                                                                v-on="on"
                                                                outlined
                                                                hide-details="auto"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                dataVigenciaFimCobertura
                                                            "
                                                            no-title
                                                            @input="
                                                                dataVigenciaFimCoberturaMenu = false
                                                            "
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Valor"
                                                        outlined
                                                        hide-details="auto"
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
                                                    :loading="adicionando"
                                                    @click="adicionar()"
                                                >
                                                    <v-icon left>
                                                        mdi-plus </v-icon
                                                    >Adicionar</v-btn
                                                >
                                                <v-btn
                                                    class="ml-2"
                                                    color="primary"
                                                    :loading="salvando"
                                                    @click="alterar()"
                                                >
                                                    <v-icon left>
                                                        mdi-pencil </v-icon
                                                    >Alterar
                                                </v-btn>
                                                <v-btn
                                                    class="ml-2"
                                                    color="primary"
                                                    :loading="excluindo"
                                                    @click="excluir()"
                                                >
                                                    <v-icon left>
                                                        mdi-delete </v-icon
                                                    >Excluir</v-btn
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
import EmpresaService from "./../services/";

export default {
    name: "Empresa",
    components: {
        AppToolbar,
        AppMenu,
    },

    data() {
        return {
            pesquisando: false,
            salvando: false,
            adicionando: false,
            excluindo: false,

            dataAdmissao1: "",
            dataAdmissaoFormatada1: "",
            menuDataAdmissao1: false,

            dataAdmissao2: "",
            dataAdmissaoFormatada2: "",
            menuDataAdmissao2: false,

            dataVigenciaInicio: "",
            dataVigenciaInicioFormatada: "",
            dataVigenciaInicioMenu: false,

            dataVigenciaFim: "",
            dataVigenciaFimFormatada: "",
            dataVigenciaFimMenu: false,

            dataVigenciaInicioCobertura: "",
            dataVigenciaInicioCoberturaFormatada: "",
            dataVigenciaInicioCoberturaMenu: false,

            dataVigenciaFimCobertura: "",
            dataVigenciaFimCoberturaFormatada: "",
            dataVigenciaFimCoberturaMenu: false,

            tab: null,

            headers: [
                { text: "Código", value: "id" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Nome", value: "nome" },
                { text: "Produtos", value: "produtos" },
                { text: "Coberturas", value: "coberturas" },
                { text: "Visualizar", value: "actions", sortable: false },
            ],

            empresas: [],
            empresa: {
                id: "",
                cnpj: "",
                nome: "",
                produtos: "",
                coberturas: "",
            },

            pesquisa: {
                id: "",
                cnpj: "",
                nome: "",
            },
        };
    },

    computed: {
        computedDataAdmissaoFormatada() {
            return this.formatDate(this.dataAdmissao1);
        },
        computedDataAdmissaoFormatada2() {
            return this.formatDate(this.dataAdmissao2);
        },
        computedDataVigenciaInicioFormatada() {
            return this.formatDate(this.dataVigenciaInicio);
        },
        computedDataVigenciaFimFormatada() {
            return this.formatDate(this.dataVigenciaFim);
        },
        computedDataVigenciaInicioCoberturaFormatada() {
            return this.formatDate(this.dataVigenciaInicioCobertura);
        },
        computedDataVigenciaFimCoberturaFormatada() {
            return this.formatDate(this.dataVigenciaFimCobertura);
        },
    },

    watch: {
        dataAdmissao1() {
            this.dataAdmissaoFormatada1 = this.formatDate(this.dataAdmissao1);
        },
        dataAdmissao2() {
            this.dataAdmissaoFormatada2 = this.formatDate(this.dataAdmissao2);
        },
        dataVigenciaInicio() {
            this.dataVigenciaInicioFormatada = this.formatDate(
                this.dataVigenciaInicio
            );
        },
        dataVigenciaFim() {
            this.dataVigenciaFimFormatada = this.formatDate(
                this.dataVigenciaFim
            );
        },
        dataVigenciaInicioCobertura() {
            this.dataVigenciaInicioCoberturaFormatada = this.formatDate(
                this.dataVigenciaInicioCobertura
            );
        },
        dataVigenciaFimCobertura() {
            this.dataVigenciaFimCoberturaFormatada = this.formatDate(
                this.dataVigenciaFimCobertura
            );
        },
    },

    methods: {
        pesquisar() {
            this.pesquisando = true;
            let self = this;
            EmpresaService.obter(this.clean(this.pesquisa))
                .then((response) => {
                    this.empresas = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.pesquisando = false;
                });
        },

        alterar() {
            this.salvando = true;
            let self = this;
            console.log(JSON.parse(JSON.stringify(this.empresa)));
            EmpresaService.alterar(JSON.parse(JSON.stringify(this.empresa)))
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.salvando = false;
                });
        },

        adicionar() {
            this.adicionando = true;
            let self = this;
            console.log(JSON.parse(JSON.stringify(this.empresa)));
            EmpresaService.adicionar(JSON.parse(JSON.stringify(this.empresa)))
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.adicionando = false;
                });
        },

        excluir() {
            this.excluindo = true;
            let self = this;
            console.log(JSON.parse(JSON.stringify(this.empresa)));
            EmpresaService.excluir(JSON.parse(JSON.stringify(this.empresa)))
                .then((response) => {
                    self.empresa = {};
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.excluindo = false;
                });
        },

        apagar() {
            this.empresas = []
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

        selecionado(obj) {
            this.empresa = obj;
        },
    },
};
</script>