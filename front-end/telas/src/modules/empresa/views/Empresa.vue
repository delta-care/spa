<template>
  <v-app>
    <app-toolbar />
    <app-menu />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="codigo"
              label="Código"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="nome"
              label="Nome"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="data_admissao"
              label="Data Admissão"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="filial"
              label="Filial"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card flat>
                <v-card-text>{{ item.content }}</v-card-text>
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
  data() {
    return {
      tab: null,
      items: [
        { tab: "Dados Básicos", content: "Tab 1 Content" },
        { tab: "Produtos e Coberturas", content: "Tab 2 Content" },
        { tab: "Cláusulas Contratuais", content: "Tab 3 Content" },
        { tab: "Complementos Cadastrais", content: "Tab 4 Content" },
        { tab: "Taxa Adicional", content: "Tab 5 Content" },
        { tab: "Ocorrência", content: "Tab 6 Content" },
        { tab: "Regulação", content: "Tab 7 Content" },
        { tab: "Liminar", content: "Tab 8 Content" },
        { tab: "Regra de Suspensão", content: "Tab 9 Content" },
      ],
    };
  },
};
</script>