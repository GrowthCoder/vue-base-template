/**
 * 子组件通过dispatch 触发上级自定义事件
 * 父组件 通过broadcast方法，向下触发子组件自定义事件
 * 重点准确的找到组件实例
*/

/*
  * @param componentName 组件名
  * @param eventName 事件名
  * @param params携带参数
*/
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.apply(this, componentName, eventName, params)
    }
  }
}
