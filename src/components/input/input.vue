<template>
  <input type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="hanldrBlur"
  />
</template>

<script>
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleInput (event) {
      const value = event.target.value
      this.currentValue = value
      this.$emit('input', value)
      this.dispatch('BFormItem', 'on-form-change', value)
    },
    hanldrBlur (event) {
      this.dispatch('BFormItem', 'on-form-blur', this.currentValue)
    }
  }
}
</script>
