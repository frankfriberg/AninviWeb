<template lang="html">
  <fieldset class="radio my-3" :id="id">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <template v-for="option in options">
      <input
        type="radio"
        :name="id"
        :id="id + option"
        :value="option"
        v-model="interface"
      />
      <label class="inline mr-3 ml-1" :for="id + option">{{ option }}</label>
    </template>
  </fieldset>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    options: Array,
    required: Boolean,
  },
  data() {
    return {
      input: false,
    }
  },
  // watch: {
  //   input: function() {
  //     this.$emit('input', input)
  //   },
  // },
  computed: {
    interface: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
