<template>
  <form @submit.prevent="login">
    <FormString
      :required="true"
      label="Email"
      id="email"
      type="email"
      key="email"
      v-model="form.email"
    />
    <FormString
      :required="true"
      label="Password"
      id="password"
      type="password"
      key="password"
      v-model="form.password"
    />
    <button type="submit">Log In</button>

    {{ form }}
    {{ error }}
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  form = {
    email: 'test@test.com',
    password: 'test',
  }

  error = ''

  login() {
    this.$auth
      .loginWith('local', {
        data: this.form,
      })
      .catch((error) => {
        console.error(error)
        this.error = error
      })
  }
}
</script>

<style></style>
