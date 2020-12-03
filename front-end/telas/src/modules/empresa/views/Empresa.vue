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
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="CNPJ"
                            outlined
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field
                            label="Nome"
                            outlined
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1">
                        <v-btn color="primary" fab hide-details="auto">
                            <v-icon> mdi-account-search </v-icon></v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            sort-by="calories"
                            class="elevation-1"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>My CRUD</v-toolbar-title>
                                    <v-divider
                                        class="mx-4"
                                        inset
                                        vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog
                                        v-model="dialog"
                                        max-width="500px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-btn
                                                color="primary"
                                                dark
                                                class="mb-2"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                New Item
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">{{
                                                    formTitle
                                                }}</span>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.name
                                                                "
                                                                label="Dessert name"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.calories
                                                                "
                                                                label="Calories"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.fat
                                                                "
                                                                label="Fat (g)"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.carbs
                                                                "
                                                                label="Carbs (g)"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.protein
                                                                "
                                                                label="Protein (g)"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="close"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="save"
                                                >
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog
                                        v-model="dialogDelete"
                                        max-width="500px"
                                    >
                                        <v-card>
                                            <v-card-title class="headline"
                                                >Are you sure you want to delete
                                                this item?</v-card-title
                                            >
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="closeDelete"
                                                    >Cancel</v-btn
                                                >
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="deleteItemConfirm"
                                                    >OK</v-btn
                                                >
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">
                                    Reset
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="2">
                        <v-text-field
                            label="Código"
                            outlined
                            disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="Nome"
                            outlined
                            disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <v-menu
                            ref="menuDataAdmissao1"
                            v-model="menuDataAdmissao1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dataAdmissaoFormatada1"
                                    label="Data Admissão"
                                    persistent-hint
                                    v-bind="attrs"
                                    @blur="
                                        dataAdmissao1 = parseDate(
                                            dataAdmissaoFormatada1
                                        )
                                    "
                                    v-on="on"
                                    outlined
                                    disabled
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="dataAdmissao1"
                                no-title
                                @input="menuDataAdmissao1 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <v-combobox
                            outlined
                            disabled
                            label="Filial"
                        ></v-combobox>
                    </v-col>
                </v-row>
                <v-card>
                    <v-tabs v-model="tab" background-color="primary" dark>
                        <v-tab key="Dados Básicos"> Dados Básicos </v-tab>
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
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            <v-text-field
                                                label="CNPJ"
                                                outlined
                                                hide-details="auto"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu
                                                ref="menuDataAdmissao2"
                                                v-model="menuDataAdmissao2"
                                                :close-on-content-click="false"
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
                                                    v-model="dataAdmissao2"
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
                                    <v-row class="mt-2 ml-2 pb-2">
                                        <v-btn color="primary">Salvar</v-btn>
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
                                                v-model="dataVigenciaInicioMenu"
                                                :close-on-content-click="false"
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
                                                    v-model="dataVigenciaInicio"
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
                                                v-model="dataVigenciaFimMenu"
                                                :close-on-content-click="false"
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
                                                    v-model="dataVigenciaFim"
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
                                                :close-on-content-click="false"
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
                                                :close-on-content-click="false"
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
                                    <v-row class="mt-2 ml-2 pb-2">
                                        <v-btn color="primary">Salvar</v-btn>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-container>
        </v-main>
        <v-footer app> </v-footer>
    </v-app>
</template>

<script>
import AppToolbar from "./../../../components/AppToolbar.vue";
import AppMenu from "./../../../components/AppMenu.vue";

export default {
    name: "Empresa",
    components: {
        AppToolbar,
        AppMenu,
    },

    data: () => ({
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

        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: "Dessert (100g serving)",
                align: "start",
                sortable: false,
                value: "name",
            },
            { text: "Calories", value: "calories" },
            { text: "Fat (g)", value: "fat" },
            { text: "Carbs (g)", value: "carbs" },
            { text: "Protein (g)", value: "protein" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

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
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
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

        initialize() {
            this.desserts = [
                {
                    name: "Frozen Yogurt",
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: "Ice cream sandwich",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    name: "Eclair",
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: "Gingerbread",
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    name: "Jelly bean",
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    name: "Lollipop",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    name: "Honeycomb",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    name: "Donut",
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    name: "KitKat",
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ];
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>