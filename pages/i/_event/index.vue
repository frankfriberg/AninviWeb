<template>
  <ResponseForm :questions="this.$store.getters['questions']" />
</template>

<script>
export default {
  layout: 'invite',
  data() {
    return {
      event: this.$store.getters['w'],
    }
  },
}
</script>
