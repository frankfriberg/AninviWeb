<template lang="html">
  <div>
    <label class="mb-3" v-if="label" :for="id">{{ label }}</label>
    <input
      class="mt-2 h-full appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shaodw-outline"
      :type="type"
      :id="id"
      :required="required"
      v-model="interface"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    label: String,
    input: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    required: Boolean,
  },
  computed: {
    interface: {
      get() {
        return this.input
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
