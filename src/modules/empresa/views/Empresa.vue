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
                                <v-tab key="Dados Básicos"> Dados </v-tab>
                                <v-tab key="Produtos"> Produtos </v-tab>
                                <v-tab key="Beneficiários">
                                    Beneficiários
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
                                                        v-model="empresa.codigo"
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
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="CEP"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.cep"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="5">
                                                    <v-text-field
                                                        label="Logradouro"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.logradouro"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Bairro"
                                                        outlined
                                                        hide-details="auto"
                                                        v-model="empresa.bairro"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-combobox
                                                        outlined
                                                        label="UF"
                                                        hide-details="auto"
                                                        v-model="empresa.uf"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                    ></v-combobox>
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
                                                    :disabled="excluirDesabilitado"
                                                    :loading="excluindo"
                                                    color="primary"
                                                    @click="excluir()"
                                                >
                                                    <v-icon left>
                                                        mdi-delete </v-icon
                                                    >Excluir</v-btn
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
                                <v-tab-item key="Produtos">
                                    <v-card>
                                        <v-card-text>
                                            <v-row v-for="produto in this.empresa.produtos" :key="produto.id">
                                                <v-col cols="12" sm="1">
                                                    <v-btn
                                                        :color="produto.campos.botao.cor"                                                       
                                                        fab
                                                        dark
                                                        small
                                                        class="mt-1"
                                                        @click="criarOuExcluirProduto(produto)"
                                                    >
                                                        <v-icon
                                                            >{{produto.campos.botao.icone}}</v-icon
                                                        >
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Plano"
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="produto.dados.plano"
                                                        v-show="produto.campos.plano.exibir"
                                                        transition="fade-transition"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Subplano"
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="produto.dados.subplano"
                                                        v-show="produto.campos.subplano.exibir"                                                       
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Início de Vigência"
                                                        outlined
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="produto.dados.data_inicio_vigencia"
                                                        v-show="produto.campos.data_inicio_vigencia.exibir"                                                        
                                                    ></v-text-field>                                                    
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="Fim de Vigência"
                                                        outlined
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="produto.dados.data_fim_vigencia"
                                                        v-show="produto.campos.data_fim_vigencia.exibir"                                                         
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
                                                    :disabled="excluirDesabilitado"
                                                    :loading="excluindo"
                                                    color="primary"
                                                    @click="excluir()"
                                                >
                                                    <v-icon left>
                                                        mdi-delete </v-icon
                                                    >Excluir</v-btn
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
                                <v-tab-item key="Beneficiários">
                                    <v-card>
                                        <v-card-text>
                                            <v-row v-for="beneficiario in this.empresa.beneficiarios" :key="beneficiario.id">
                                                <v-col cols="12" sm="1">
                                                    <v-btn
                                                        :color="beneficiario.campos.botao.cor"                                                     
                                                        fab
                                                        dark
                                                        small
                                                        class="mt-1"
                                                        @click="criarOuExcluirBeneficiario(beneficiario)"
                                                    >
                                                        <v-icon
                                                            >{{beneficiario.campos.botao.icone}}</v-icon
                                                        >
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Plano"
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="beneficiario.dados.plano"
                                                        v-show="beneficiario.campos.plano.exibir"
                                                        transition="fade-transition"
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-combobox
                                                        outlined
                                                        label="Subplano"
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="beneficiario.dados.subplano"
                                                        v-show="beneficiario.campos.subplano.exibir"                                                       
                                                    ></v-combobox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                        label="Nome"
                                                        outlined
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="beneficiario.dados.nome"
                                                        v-show="beneficiario.campos.nome.exibir"                                                        
                                                    ></v-text-field>  
                                                </v-col>
                                                <v-col cols="12" sm="2">
                                                    <v-text-field
                                                        label="CPF"
                                                        outlined
                                                        hide-details="auto"
                                                        :disabled="
                                                            camposDesabilitados
                                                        "
                                                        v-model="beneficiario.dados.cpf"
                                                        v-show="beneficiario.campos.cpf.exibir"                                                        
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
                                                    :disabled="excluirDesabilitado"
                                                    :loading="excluindo"
                                                    color="primary"
                                                    @click="excluir()"
                                                >
                                                    <v-icon left>
                                                        mdi-delete </v-icon
                                                    >Excluir</v-btn
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
import EmpresaService from "./../services/";
import { mapActions } from "vuex";

export default {
    name: "Empresa",
    title: "Gestão de Empresa",
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
            excluirDesabilitado: true,
            voltarDesabilitado: true,
            camposDesabilitados: true,

            tab: null,

            headers: [
                { text: "Código", value: "codigo" },
                { text: "CNPJ", value: "cnpj" },
                { text: "Nome", value: "nome" },
                { text: "Produtos", value: "produtos" },
                { text: "Coberturas", value: "coberturas" },
                { text: "Visualizar", value: "actions", sortable: false },
            ],

            empresas: [],
            empresa: {
                codigo: "",
                cnpj: "",
                nome: "",
                email: "",
                cep: "",
                logradouro: "",
                bairro: "",
                uf: "",
                produtos: [],
                beneficiarios: [],
            },

            pesquisa: {
                codigo: "",
                cnpj: "",
                nome: "",
            },
        };
    },

    methods: {
        pesquisar() {
            this.pesquisando = true;
            let self = this;
            EmpresaService.obter(this.clean(this.pesquisa))
                .then((response) => {
                    this.empresas = response.data;
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
            EmpresaService.alterar(JSON.parse(JSON.stringify(this.empresa)))
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
                    self.excluirDesabilitado = true;
                    self.adicionarDesabilitado = false;
                    self.apagarEmpresa();
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
                const empresaSomenteDados = this.retornarEmpresaSomenteDados();
                EmpresaService.adicionar(empresaSomenteDados)
                    .then(() => {})
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        self.adicionando = false;
                        self.adicionarLabel = "Adicionar";
                        self.camposDesabilitados = true;
                        self.voltarDesabilitado = true;
                    });
            }
        },

        retornarEmpresaSomenteDados() {
            let empresaSomenteValores = this.transformarObjVueParaObjNormal(this.empresa);
            
            let produtos=[];
            empresaSomenteValores.produtos.forEach(produto => {
                if (produto.dados.plano!="") {
                    produtos.push(produto.dados);
                }
            });
            empresaSomenteValores.produtos=produtos;
 
            let beneficiarios=[];
            empresaSomenteValores.beneficiarios.forEach(beneficiario => {
                if (beneficiario.dados.plano!="") {
                    beneficiarios.push(beneficiario.dados);
                }
            });
            empresaSomenteValores.beneficiarios=beneficiarios;
            
            return empresaSomenteValores;
        },

        transformarObjVueParaObjNormal(obj) {
            return Object.assign ({}, obj)
        },

        excluir() {
            this.excluindo = true;
            let self = this;
            EmpresaService.excluir(JSON.parse(JSON.stringify(this.empresa)))
                .then(() => {
                    self.empresa = {};
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    self.excluindo = false;
                    self.alterarLabel = "Alterar";
                    self.alterarDesabilitado = true;
                    self.camposDesabilitados = true;
                    self.voltarDesabilitado = true;
                    self.excluirDesabilitado = true;
                    self.adicionarDesabilitado = false;
                    self.apagarEmpresa();
                    self.pesquisar(); // refresh em v-data-table
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
                produtos: [],
                beneficiarios: [],
            };
            this.criarOuExcluirProduto();
            this.criarOuExcluirBeneficiario();
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

        selecionar(empresa) {
            this.empresa = empresa;
            this.alterarLabel = "Salvar";
            this.adicionarDesabilitado = true;
            this.alterarDesabilitado = false;
            this.excluirDesabilitado = false;
            this.voltarDesabilitado = false;
            this.camposDesabilitados = false;
        },

        voltar() {
            this.apagarEmpresa();
            this.adicionarLabel = "Adicionar";
            this.alterarLabel = "Alterar";
            this.adicionarDesabilitado = false;
            this.alterarDesabilitado = true;
            this.excluirDesabilitado = true;
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
        
        criarOuExcluirProduto (produtoClicado) {
            if (produtoClicado==undefined)
            {
                this.criarProduto();
            } 
            else 
            {
                if (this.camposDesabilitados==true) return;
                if (produtoClicado.campos.botao.cor=="blue") 
                {
                    this.criarProduto();
                    produtoClicado.campos.botao.cor="red";
                    produtoClicado.campos.botao.icone="mdi-minus";
                    produtoClicado.campos.plano.exibir=true;
                    produtoClicado.campos.subplano.exibir=true;
                    produtoClicado.campos.data_inicio_vigencia.exibir=true;
                    produtoClicado.campos.data_fim_vigencia.exibir=true;
                } 
                else 
                {
                    this.excluirProduto(produtoClicado);
                }
            }

        }, 

        criarProduto () {
            let produto = {
                id: this.gerarStringUnica(5),
                campos: {
                    botao: {
                        cor: "blue",
                        icone: "mdi-plus"
                    },
                    plano: {
                        exibir: false
                    },
                    subplano: {
                        exibir: false                            
                    },
                    data_inicio_vigencia: {
                        exibir: false                            
                    },
                    data_fim_vigencia: {
                        exibir: false                            
                    }
                }, 
                dados: {
                    plano: "",
                    subplano: "",
                    data_inicio_vigencia: "",
                    data_fim_vigencia: ""
                },
            }
            this.empresa.produtos.push(produto);
        },

        excluirProduto (produtoClicado) {
            const produtosRestantes = this.empresa.produtos.filter(produto => produto.id != produtoClicado.id);
            this.empresa.produtos = produtosRestantes;     
        },

        criarOuExcluirBeneficiario (beneficiarioClicado) {
            if (beneficiarioClicado==undefined)
            {
                this.criarBeneficiario();
            } 
            else 
            {
                if (this.camposDesabilitados==true) return;
                if (beneficiarioClicado.campos.botao.cor=="blue") 
                {
                    this.criarBeneficiario();
                    beneficiarioClicado.campos.botao.cor="red";
                    beneficiarioClicado.campos.botao.icone="mdi-minus";
                    beneficiarioClicado.campos.plano.exibir=true;
                    beneficiarioClicado.campos.subplano.exibir=true;
                    beneficiarioClicado.campos.nome.exibir=true;
                    beneficiarioClicado.campos.cpf.exibir=true;
                } 
                else 
                {
                    this.excluirBeneficiario(beneficiarioClicado);
                }
            }

        }, 

        criarBeneficiario () {
            let beneficiario = {
                id: this.gerarStringUnica(5),
                campos: {
                    botao: {
                        cor: "blue",
                        icone: "mdi-plus"
                    },
                    plano: {
                        exibir: false
                    },
                    subplano: {
                        exibir: false                            
                    },
                    nome: {
                        exibir: false                            
                    },
                    cpf: {
                        exibir: false                            
                    }
                }, 
                dados: {
                    plano: "",
                    subplano: "",
                    nome: "",
                    cpf: ""
                },
            }
            this.empresa.beneficiarios.push(beneficiario);
        },

        excluirBeneficiario (beneficiarioClicado) {
            const beneficiariosRestantes = this.empresa.beneficiarios.filter(beneficiario => beneficiario.id != beneficiarioClicado.id);
            this.empresa.beneficiarios = beneficiariosRestantes;     
        },

        ...mapActions(["setTitle"]),
    },

    created() {
        this.setTitle({ title: "Gestão de Empresa" });
        this.criarOuExcluirProduto();
        this.criarOuExcluirBeneficiario();
    }, 
};
</script>