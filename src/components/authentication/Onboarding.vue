<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-main>
            <v-tabs v-model="tab" centered>
              <v-tab>Login</v-tab>
              <v-tab>Registration</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <LoginForm></LoginForm>
              </v-tab-item>
              <v-tab-item>
                <RegistrationForm></RegistrationForm>
              </v-tab-item>
            </v-tabs-items>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import LoginForm from "@/components/authentication/LoginForm"
import RegistrationForm from "@/components/authentication/RegistrationForm"

export default {
  name: "Onboarding",
  data: () => ({
    tab: null,
  }),
  components: {
    LoginForm,
    RegistrationForm,
  },
}
</script>