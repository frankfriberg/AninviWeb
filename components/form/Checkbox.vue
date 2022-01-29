<template lang="html">
  <fieldset class="my-3">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <div class="radio" :id="id">
      <template v-for="(option, index) in options">
        <input
          v-if="returnValue"
          type="checkbox"
          :name="id"
          :id="id + option"
          :value="option"
          v-model="input"
        />
        <input
          v-else
          type="checkbox"
          :name="id"
          :id="id + option"
          :value="option"
          v-model="input[index]"
        />
        <label class="inline ml-1 mr-3" :for="id + option">{{ option }}</label>
      </template>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, VModel } from 'vue-property-decorator'

@Component
export default class FormCheckbox extends Vue {
  @VModel({ type: Array }) input!: string[]

  @Prop({ default: false }) returnValue!: boolean
  @Prop() readonly id!: string
  @Prop() readonly label!: string
  @Prop() readonly options!: string[]
  @Prop({ default: false }) readonly required!: boolean
}
</script>
