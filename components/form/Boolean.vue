<template lang="html">
  <fieldset class="my-3">
    <legend class="mb-2" :for="id">{{ label }}</legend>
    <input
      type="radio"
      :name="id"
      :id="id + $t('true')"
      :value="true"
      v-model="input"
    />
    <label class="inline ml-1 mr-3" :for="id + $t('true')">
      {{ $t('true') }}
    </label>

    <input
      type="radio"
      :name="id"
      :id="id + $t('false')"
      :value="false"
      v-model="input"
    />
    <label class="inline ml-1 mr-3" :for="id + $t('false')">
      {{ $t('false') }}
    </label>
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue, ModelSync, VModel } from 'vue-property-decorator'

@Component
export default class FormBoolean extends Vue {
  @VModel({ type: Boolean }) input!: boolean

  @Prop() readonly id!: string
  @Prop() readonly label!: string
  @Prop() readonly options!: string[]
  @Prop({ default: false }) readonly required!: boolean
}
</script>
