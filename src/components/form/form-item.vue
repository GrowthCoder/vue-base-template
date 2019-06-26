<template>
  <div>
    <label for="" v-if="label">{{label}}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import Emitter from '@/mixins/emitter'
export default {
  name: 'BFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('BForm', 'on-form-item-add', this)
      this.setRules()
    }
  },
  beforeDestory () {
    this.dispatch('BForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    onFieldBlur () {},
    onFieldChange () {}
  }
}
</script>
