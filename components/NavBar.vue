<template>
  <nav>
    <router-link to="/">Home</router-link>
    <template v-if="!this.$auth.loggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </template>
    <template v-if="this.$auth.loggedIn">
      <router-link to="/user">My Events</router-link>
    </template>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {}
</script>

<style scoped></style>
