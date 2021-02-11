<template>
    <v-app>
        <app-toolbar />
        <app-menu />
        <v-main>
            <v-container >
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-6">
                            <apex-chart ref="receita" type="line" :options="chartOptions_receita" :series="series_receita"></apex-chart>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-6">
                            <apex-chart ref="despesa" type="line" :options="chartOptions_despesa" :series="series_despesa"></apex-chart>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class="pa-6">
                            <apex-chart ref="resultado" type="line" :options="chartOptions_resultado" :series="series_resultado"></apex-chart>
                        </v-card>
                    </v-col>
                </v-row>   
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-6">
                            <apex-chart ref="empresas" type="bar" :options="chartOptions_empresas" :series="series_empresas"></apex-chart>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-6">
                            <apex-chart ref="beneficiarios" type="bar" :options="chartOptions_beneficiarios" :series="series_beneficiarios"></apex-chart>
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
import PainelService from "./../services/";
import ApexChart from 'vue-apexcharts';
import { mapActions } from "vuex";

export default {
    name: "Painel",
    title: "Painel",
    components: {
        AppToolbar,
        AppMenu,
        ApexChart
    },
    data() {
        return {
            series_receita: [{
                name: "Valor",
                data: []
            }],
            chartOptions_receita: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                    }
                },
                noData: {
                    text: 'Carregando...'
                },
                subtitle: {
                    text: 'Receita',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                    }
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], 
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                        return "R$ " + val
                        }
                    }
                }
            },
            series_despesa: [{
                name: "Valor",
                data: []
            }],
            chartOptions_despesa: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                    }
                },
                noData: {
                    text: 'Carregando...'
                },
                subtitle: {
                    text: 'Despesa',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                    }
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], 
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                        return "R$ " + val
                        }
                    }
                }
            },
            series_resultado: [{
                name: "Valor",
                data: []
            }],
            chartOptions_resultado: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                noData: {
                    text: 'Carregando...'
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                    }
                },
                subtitle: {
                    text: 'Resultado',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                    }
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], 
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                        return "R$ " + val
                        }
                    }
                }               
            },
            series_empresas: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }],
            chartOptions_empresas: {
                chart: {
                    type: 'bar',
                    maxHeight: 350
                },
                title: {
                    text: 'Empresas por Mês',
                    offsetX: 0,
                    style: {
                        fontSize: '18px',
                    }
                },
                noData: {
                    text: 'Carregando...'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: [],
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                }
            },
            series_beneficiarios: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }],
            chartOptions_beneficiarios: {
                chart: {
                    type: 'bar',
                    maxHeight: 350
                },
                title: {
                    text: 'Beneficiários por Mês',
                    offsetX: 0,
                    style: {
                        fontSize: '18px',
                    }
                },
                noData: {
                    text: 'Carregando...'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: [],
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                }
            }, 
            dados: ""           
        }
    },
    methods: {
        ...mapActions(["setTitle"]),
        pesquisar() {
            PainelService.obter()
                .then((response) => {
                    this.carregarPainel(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        carregarPainel(dados) {
            this.carregarReceita(dados);
            this.carregarDespesa(dados);
            this.carregarResultado(dados);
            this.carregarEmpresas(dados);
            this.carregarBeneficiarios(dados);
        },
        carregarReceita(dados) {
            let self = this;
            let receita_total=0;
            dados[0].receitas.forEach(receita => {
                self.series_receita[0].data.push(receita.valor);
                self.chartOptions_receita.xaxis.categories.push(receita.mes);
                receita_total = receita_total + parseInt(receita.valor);
            });
            this.chartOptions_receita.title.text='R$' + receita_total + ',00';
            this.$refs.receita.updateOptions(this.chartOptions_receita);
            this.$refs.receita.updateSeries(this.series_receita);
        },
        carregarDespesa(dados) {
            let self = this;
            let despesa_total=0;
            dados[0].despesas.forEach(despesa => {
                self.series_despesa[0].data.push(despesa.valor);
                self.chartOptions_despesa.xaxis.categories.push(despesa.mes);
                despesa_total = despesa_total + parseInt(despesa.valor);
            });
            this.chartOptions_despesa.title.text='R$' + despesa_total + ',00';
            this.$refs.despesa.updateOptions(this.chartOptions_despesa);
            this.$refs.despesa.updateSeries(this.series_despesa);
        },
        carregarResultado(dados) {
            let self = this;
            let resultado_total=0;
            dados[0].resultados.forEach(resultado => {
                self.series_resultado[0].data.push(resultado.valor);
                self.chartOptions_resultado.xaxis.categories.push(resultado.mes);
                resultado_total = resultado_total + parseInt(resultado.valor);
            });
            this.chartOptions_resultado.title.text='R$' + resultado_total + ',00';
            this.$refs.resultado.updateOptions(this.chartOptions_resultado);
            this.$refs.resultado.updateSeries(this.series_resultado);
        },
        carregarEmpresas(dados) {
            let self = this;
            this.series_empresas[0].name='Essencial';
            this.series_empresas[1].name='Premium';
            this.series_empresas[2].name='Platinum';
            dados[0].empresas.forEach(empresa => {
                if (empresa.plano=='Essencial') self.series_empresas[0].data.push(empresa.valor);
                if (empresa.plano=='Premium') self.series_empresas[1].data.push(empresa.valor);
                if (empresa.plano=='Platinum') self.series_empresas[2].data.push(empresa.valor);
                if (empresa.plano=='Platinum') self.chartOptions_empresas.xaxis.categories.push(empresa.mes);
            });
            this.$refs.empresas.updateOptions(this.chartOptions_empresas);
            this.$refs.empresas.updateSeries(this.series_empresas);
        },
        carregarBeneficiarios(dados) {
            let self = this;
            this.series_beneficiarios[0].name='Essencial';
            this.series_beneficiarios[1].name='Premium';
            this.series_beneficiarios[2].name='Platinum';
            dados[0].beneficiarios.forEach(beneficiario => {
                if (beneficiario.plano=='Essencial') self.series_beneficiarios[0].data.push(beneficiario.valor);
                if (beneficiario.plano=='Premium') self.series_beneficiarios[1].data.push(beneficiario.valor);
                if (beneficiario.plano=='Platinum') self.series_beneficiarios[2].data.push(beneficiario.valor);
                if (beneficiario.plano=='Platinum') self.chartOptions_beneficiarios.xaxis.categories.push(beneficiario.mes);
            });
            this.$refs.beneficiarios.updateOptions(this.chartOptions_beneficiarios);
            this.$refs.beneficiarios.updateSeries(this.series_beneficiarios);
        }
    },
    created() {
        this.setTitle({ title: "Painel" });
    },
    mounted() {
        this.pesquisar();
    }
};
</script>