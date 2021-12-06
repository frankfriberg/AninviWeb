<template>
  <ResponseForm :questions="this.$store.getters['questions']" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'invite',
  data() {
    return {
      event: this.$store.getters['w'],
    }
  },
})
</script>
