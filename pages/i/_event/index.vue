<template>
  <ResponseForm :questions="this.event.questions" :eventId="this.event._id" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'invite',
})
export default class InviteIndex extends Vue {
  event: object = this.$store.getters['event']
}
</script>
