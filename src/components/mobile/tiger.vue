<template>
  <div class="reward">
    <ul>
      <li class="base-transform" 
        :class="{'scroll-animation': startScroll}" 
        v-for="num in 6" :key="num">
        <div v-for="(item, index) in rewardList" :key="index">{{item}}</div>
      </li>
    </ul>
    <button @click="handleAward">开始抽奖</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rewardList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      startScroll: false
    }
  },
  methods: {
    handleAward () {
      this.startScroll = true
    }
  }
}
</script>
<style lang="less">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
}
ul {
  position: relative;
  list-style-type: none;
  &:extend(.flex);
  margin-top: 100px;
  height: 50px;
  overflow: hidden;
  li {
    width: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #ccc;
  }
}
button {
  display: block;
  background: #E31436;
  color: #fff;
  padding: 10px;
  margin: 50px auto;
  border-radius: 12px;
}
.base-transform {
  will-change: transform;
  transition-property: transform;
  transition-timing-function: ease-out;
}
.scroll-animation {
  animation: scrollAni 0.2s linear infinite;
}
@keyframes scrollAni {
  0% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(50%)
  }
}
</style>
