<template lang="html">
  <fieldset>
    <label class="mb-3" v-if="label" :for="id">{{ label }}</label>
    <input
      class="w-full h-full px-3 py-2 mt-2 leading-tight border rounded appearance-none focus:outline-none focus:shaodw-outline"
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      v-model="input"
    />
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, ModelSync } from 'vue-property-decorator'

@Component
export default class FormString extends Vue {
  @ModelSync('change', 'input') input!: string

  @Prop() readonly id!: string
  @Prop() readonly label!: string
  @Prop() readonly placeholder!: string
  @Prop({ default: 'text' }) readonly type!: string
  @Prop() value?: string
  @Prop({ default: false }) readonly required!: boolean
}
</script>
