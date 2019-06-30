<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import {findComponentsDownward} from '@/utils/assist'
import Emitter from '@/mixins/emitter'
export default {
  name: 'BCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  mounted () {
    this.updateModel(true)
  },
  watch: {
    value (val) {
      this.updateModel(true)
    }
  },
  methods: {
    updateModel (update) {
      // 更新checkbox
      this.childrens = findComponentsDownward(this, 'BCheckBox')
      const {value} = this
      if (this.childrens) {
        this.childrens.forEach(child => {
          child.model = value

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
          }
        })
      }
    },
    change (data) {
      this.currentValue = data
      this.$emit('on-change', data)
      this.$emit('input', data)
      this.dispatch('iFormItem', 'on-form-change', data)
    }
  }
}
</script>
