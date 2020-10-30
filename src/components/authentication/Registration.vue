<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">
        <v-card class="elevation-12" width="30%">
          <v-toolbar color="blue" dark flat>
            <v-toolbar-title>Registration form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.username"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                required
                :rules="[(v) => !!v || 'Login is required']"
              ></v-text-field>
              <v-text-field
                id="email"
                v-model="user.email"
                label="E-mail"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                required
                :rules="[(v) => !!v || 'Email is required']"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="user.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :rules="[(v) => !!v || 'Password is required']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="handleRegister">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'RegistrationForm',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>
