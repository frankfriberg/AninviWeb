export { default as NavBar } from '../../components/NavBar.vue'
export { default as ResponseForm } from '../../components/ResponseForm.vue'
export { default as FormBoolean } from '../../components/form/Boolean.vue'
export { default as FormCheckbox } from '../../components/form/Checkbox.vue'
export { default as FormOption } from '../../components/form/Option.vue'
export { default as FormRadio } from '../../components/form/Radio.vue'
export { default as FormString } from '../../components/form/String.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
