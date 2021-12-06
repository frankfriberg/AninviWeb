<template lang="html">
  <fieldset class="my-3">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <div class="radio" :id="id">
      <template v-for="(option, index) in options">
        <input
          type="checkbox"
          :name="id"
          :id="id + option"
          :value="option"
          v-model="checked"
        />
        <label class="inline ml-1 mr-3" :for="id + option">{{
          translated[index]
        }}</label>
      </template>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    options: Array,
    translated: Array,
  },
  data() {
    return {
      checked: [],
    }
  },
  watch: {
    checked: function(val) {
      this.$emit('input', val)
    },
  },
}
</script>
