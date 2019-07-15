<template>
    <div class="b-model">
      {{currentValue}}
      <button @click="handleClick">click</button>
    </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  created () {

  },
  methods: {
    handleClick () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='less' scoped>
.b-model {
  a {
    color: #42b983;
  }
  button {
    width: 80px;
    height: 40px;
    background: #42b983;
    color: #fff;
    border-radius: 12px;
    margin-top: 20px;
  }
}
</style>
