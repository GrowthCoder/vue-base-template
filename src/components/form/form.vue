<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
/*
* form中缓存item实例，便于统一校验
*/
export default {
  name: 'BForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
      fields: [] // 缓存子组件实例
    }
  },
  created () {
    this.$on('on-form-item-add', (field) => {
      field && this.fields.push(field)
    })
    this.$on('on-form-item-remove', (field) => {
      field.prop && this.fields.splice(this.fields.indexOf(field), 1)
    })
  }
}
</script>
