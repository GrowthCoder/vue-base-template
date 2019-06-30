<template>
  <label>
    <span>
      <input type="checkbox"
        v-if="group"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change">
      <input type="checkbox"
        v-else
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import {findComponentUpward} from '@/utils/assist'
import Emitter from '@/mixins/emitter'
export default {
  name: 'BCheckBox',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // group时有效 赋值给value 切换选中状态
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value,
      parent: null,
      group: false,
      model: [] // checkoutgroup子元素绑定数据 数组 选中项存数组中
    }
  },
  watch: {
    value (val) {
      // 由外而内控制
      this.updateModel()
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'BCheckboxGroup') // 是否是group组件

    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    change (e) {
      if (this.disable) {
        return false
      }
      // 由内向外控制
      const checked = e.target.checked
      this.currentValue = checked

      this.$emit('input', this.currentValue)

      if (this.parent) {
        // 如果是group，事件由group派发
        this.parent.change(this.model)
      } else {
        // 外部事件
        this.$emit('on-change', this.currentValue)
        this.dispatch('iFormItem', 'on-form-change', this.currentValue)
      }
    },
    updateModel () {
      this.currentValue = this.value
    }
  }
}
</script>
