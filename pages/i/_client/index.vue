<template>
  <h1>{{ this.client }}</h1>
</template>

<script>
export default {
  layout: 'invite',
  async asyncData({ params }) {
    const client = params.client
    return { client }
  },
}
</script>
