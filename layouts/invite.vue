<template>
  <div>
    <h1>Invite Layout</h1>
    {{ event }}
    <Nuxt />
  </div>
</template>

<script>
export default {
  props: ['event'],
  middleware: ['verification'],
}
</script>

<style></style>
