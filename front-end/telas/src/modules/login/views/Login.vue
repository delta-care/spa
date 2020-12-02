<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm6 md4 lg3 x13>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Entrar</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-progress-circular
                  indeterminate
                  width="2"
                  color="white"
                  v-show="isLoading"
                ></v-progress-circular>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-email"
                    name="email"
                    label="Email"
                    type="email"
                    v-model.trim="$v.user.email.$model"
                    :error-messages="emailErrors"
                    :success="!$v.user.email.$invalid"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Senha"
                    type="password"
                    v-model.trim="$v.user.password.$model"
                    :error-messages="passwordErrors"
                    :success="!$v.user.password.$invalid"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  large
                  :disabled="$v.$invalid"
                  @click="submit"
                  >Login</v-btn
                >
              </v-card-actions>
              <v-snackbar v-model="showSnackbar" top>
                {{ error }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="showSnackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import authService from "./../services/";

export default {
  name: "Login",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
    isLoading: false,
    error: undefined,
    showSnackbar: false,
  }),
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;
      if (!email.$dirty) {
        return errors;
      }
      !email.required && errors.push("Email é obrigatório!");
      !email.email && errors.push("Insira um email válido!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      const password = this.$v.user.password;
      if (!password.$dirty) {
        return errors;
      }
      !password.required && errors.push("Senha é obrigatória!");
      !password.minLength &&
        errors.push(
          `Insira pelo menos ${password.$params.minLength.min} caracteres!`
        );
      return errors;
    },
  },
  methods: {
    async submit() {
      this.isLoading = true;
      try {
        await authService.login(this.user).then((response) => {
          if (response.data.length == 1) {
            localStorage.setItem("token", response.data[0].token);
            this.$router.push(this.$route.query.redirect || "/home");
          } else {
            throw new Error("Email e senha não coincidem.");
          }
        });
      } catch (error) {
        this.error = error.message;
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>