// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
  created: function () {
    // 全局混入参数
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  myOption: 'gao'
})
