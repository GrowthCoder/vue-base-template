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
  </div>
</template>

<script>
import BForm from '@/components/form/form'
import BFormItem from '@/components/form/form-item'
import BInput from '@/components/input/input'

export default {
  name: 'HelloWorld',
  components: {
    BForm,
    BFormItem,
    BInput
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
</style>
