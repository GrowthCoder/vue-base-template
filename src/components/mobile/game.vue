<template>
  <div class="reward">
    <div class="reward-box">
      <div class="groups animation-ease"
        ref="groups"
        :style="{'height': groupsHeight}"
        v-for="k in 6"
        :key="k"
        @webkitTransitionEnd="endGame(k)">
          <ul class="group-item"
            ref="groupItem"
            v-for="i in (round+1)" :key="i">
              <li class="prize-item"
                ref="prizeItem"
                v-for="item in prizes" :key="item"><img src="./game.png" alt=""></li>
          </ul>
      </div>
    </div>

    <div @click="startClick">{{disClick?'抽奖中...':'点击开始'}}</div>
  </div>
</template>
<script>
export default {
  props: {
    prizeId: String // 中奖id
  },
  data () {
    return {
      round: 1, // 转几回合后停下来
      prizes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], // 存放0-9a-zA-Z 中奖列表
      disClick: false, // 防止多次点击
      itemHeight: 65, // 每个奖品的高度
      groupsHeight: 0
    }
  },
  created () {
    // 向prizes添加a-z
    for (let i = 97; i < 123; i++) {
      this.prizes.push(String.fromCharCode(i))
    }
    // 向prizes添加A-Z
    for (let i = 65; i < 91; i++) {
      this.prizes.push(String.fromCharCode(i))
    }
  },
  mounted () {
    // 获取元素高度
    this.itemHeight = this.$refs.prizeItem[0].clientHeight
    this.groupsHeight = this.itemHeight * this.prizes.length * (this.round + 1)
  },
  methods: {
    startClick () {
      // 开始抽奖
      if (this.disClick) {
        return
      }
      this.runGame()
    },
    getIndexs () {
      // 获取中奖ID对应下标
      let indexs = []
      const prizeId = this.prizeId
      for (let i = 0; i < prizeId.length; i++) {
        indexs.push(this.prizes.indexOf(prizeId[i]))
      }
      return indexs
    },
    runGame () {
      // 启动抽奖
      this.disClick = true
      // 先重置抽奖
      this.resetGame()
      let itemHeight = this.itemHeight
      let groupsHeight = this.round * this.$refs.groupItem[0].clientHeight
      let groups = this.$refs.groups

      groups.forEach((val, i) => {
        // 计算中奖列对应位置
        let pos = this.getIndexs()[i] * itemHeight + groupsHeight
        setTimeout(() => {
          val.className = 'groups animation-ease'
          val.style.transform = `translate3d(0, -${pos}px, 0)`
        }, i * 300) // 延迟执行动画
      })
    },
    endGame (k) {
      // 抽奖结束后的回调
      if (k === 6) {
        this.disClick = false
        // 触发传入的方法
        this.$emit('gameEnd', this.prizeId)
      }
    },
    resetGame () {
      // 重置状态
      const groups = this.$refs.groups

      groups.forEach(val => {
        val.className = 'groups'
        val.style.transform = ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.reward-box{
  width:300px;
  height:60px;
  overflow: hidden;
  background: #fff;
  display: flex;
  border: 1px solid #CCC;
  border-right: none;
  will-change: transform;
  transform-style: preserve-3d;
  .animation-ease{
    transition-property: transform;
    transition-timing-function: ease-in-out;
    transition-duration: 4s;
    transform-style: preserve-3d;
  }

  .groups{
    width:50px;
    text-align: center;

    .prize-item{
      // height: 65px;
      font-size: 50px;
      border-right: 1px solid #CCC;

    }
  }
}
</style>
