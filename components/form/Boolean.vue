<template lang="html">
  <fieldset class="my-3">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <input
      type="radio"
      :name="id"
      :id="id + $t('true')"
      :value="true"
      v-model.lazy="interface"
    >
    <label class="inline mr-3 ml-1" :for="id + $t('true')">
      {{ $t('true') }}
    </label>

    <input
      type="radio"
      :name="id"
      :id="id + $t('false')"
      :value="false"
      v-model.lazy="interface"
    >
    <label class="inline mr-3 ml-1" :for="id + $t('false')">
      {{ $t('false') }}
    </label>
  </fieldset>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    required: Boolean
  },
  computed: {
    interface: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
