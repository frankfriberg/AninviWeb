<template lang="html">
  <fieldset class="my-3 radio" :id="id">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <template v-for="option in options">
      <input
        type="radio"
        :name="id"
        :id="id + option"
        :value="option"
        v-model="input"
      />
      <label class="inline ml-1 mr-3" :for="id + option">{{ option }}</label>
    </template>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, VModel } from 'vue-property-decorator'

@Component
export default class FormRadio extends Vue {
  @VModel({ type: String }) input!: string

  @Prop() readonly id!: string
  @Prop() readonly label!: string
  @Prop() readonly options!: string[]
  @Prop({ default: false }) readonly required!: boolean
}
</script>
