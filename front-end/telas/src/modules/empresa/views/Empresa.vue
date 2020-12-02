<template>
  <v-app>
    <app-toolbar />
    <app-menu />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field label="Código" outlined disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Nome" outlined disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Data Admissão"
                  persistent-hint
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                  outlined
                  disabled
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2">
            <v-combobox outlined disabled label="Filial"></v-combobox>
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
              <v-card>
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

  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
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
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
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
  },
};
</script>