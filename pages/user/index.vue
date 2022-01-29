<template>
  <div>
    <nuxt-link :to="{ name: 'user-new' }">New Event</nuxt-link>
    <nuxt-link
      class="block"
      v-for="event in user.events"
      :key="event.slug"
      :to="{ name: 'user-event', params: { event: event.slug } }"
    >
      <h2>{{ event.title }}</h2>
      <h3>{{ event.slug }}</h3>
      <span>{{ event.date }}</span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'user',
  middleware: ['auth'],
})
export default class UserIndex extends Vue {
  user: object = this.$auth.user
}
</script>
