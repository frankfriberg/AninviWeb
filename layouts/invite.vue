<template>
  <div>
    <h1>Invite Layout</h1>
    {{ client }}
    <Nuxt />
  </div>
</template>

<script>
export default {
  props: ['client'],
  middleware: ['verification'],
}
</script>

<style></style>
