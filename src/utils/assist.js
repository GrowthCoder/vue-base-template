// 向上查找最近的指定组件
export function findComponentUpward (context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent

    if (parent) name = parent.$options.name
  }

  return parent
}

// 向下查找所有指定的组件
export function findComponentsDownward (context, componentName) {
  // reducer(accumulator, currentValue)
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)

    return components.concat(foundChilds)
  }, [])
}
