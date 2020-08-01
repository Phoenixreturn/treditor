<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form ref="loginForm">
        <v-text-field
          v-model="user.username"
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          required
          :rules="[v => !!v || 'Login is required']"
        ></v-text-field>

        <v-text-field
          id="password"
          v-model="user.password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          required
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import User from "../../models/user"

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      message: "",
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile")
    }
  },
  methods: {
    handleLogin() {
      if (this.$refs.loginForm.validate()) {
        console.log("Login Form is valid $$$$$$")
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile")
          },
          (error) => {
            this.loading = false
            this.message = (error.response && error.response.data) || error.message || error.toString()
          }
        )
      }
    },
  },
}
</script>