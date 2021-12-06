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
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      form: {
        email: 'admin@test.com',
        password: 'admin',
      },
      error: '',
    }
  },
  methods: {
    async login() {
      this.$auth
        .loginWith('local', {
          data: this.form,
        })
        .then((response) => {
          this.$auth.setUser(response)
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })
    },
  },
})
</script>

<style></style>
