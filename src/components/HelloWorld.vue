<template>
  <div class="hello">
    <b-form :model="formValidate" :rules="ruleValidate">
      <b-form-item label="用户名" prop="name">
        <b-input type="text" v-model="formValidate.name" />
      </b-form-item>
      <b-form-item label="邮箱" prop="mail">
        <b-input type="text" v-model="formValidate.mail" />
      </b-form-item>
    </b-form>
    <!-- <b-checkbox v-model="single">single</b-checkbox> -->

    <b-checkbox-group v-model="multiple">
      <b-checkbox label="option1">single</b-checkbox>
      <b-checkbox label="option2">single</b-checkbox>
    </b-checkbox-group>
    <button @click="changeCheck">click</button>
    <p v-if="show" ref="node">11111</p>

    <!-- model -->
    <b-model
      @input="handleModelStatus"
      v-model="modelVal"></b-model>
  </div>
</template>

<script>
import BForm from '@/components/form/form'
import BFormItem from '@/components/form/form-item'
import BInput from '@/components/input/input'
import BCheckbox from '@/components/checkbox/checkbox'
import BCheckboxGroup from '@/components/checkbox/checkbox-group'
import BModel from '@/components/model/index.vue'
export default {
  name: 'HelloWorld',
  components: {
    BForm,
    BFormItem,
    BInput,
    BCheckbox,
    BCheckboxGroup,
    BModel
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      single: true,
      multiple: ['option1'],
      modelVal: false,
      show: false,
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeCheck () {
      this.modelVal = !this.modelVal
      this.single = this.multiple = []
      this.show = true
      console.log(this.$refs.node)
      this.$nextTick(() => {
        console.log(this.$refs.node)
      })
    },
    handleModelStatus (val) {
      console.log(val)
      this.modelVal = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
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
</style>
