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
                v-for="item in prizes" :key="item">{{item}}</li>
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
      round: 6, // 转几回合后停下来
      prizes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      disClick: false, // 防止多次点击
      itemHeight: 65, // 每个奖品的高度
      groupsHeight: 0,
      startGame: false // 控制游戏开启
    }
  },
  created () {
    for (let i = 97; i < 123; i++) {
      this.prizes.push(String.fromCharCode(i))
    }
    for (let i = 65; i < 91; i++) {
      this.prizes.push(String.fromCharCode(i))
    }
  },
  mounted () {
    this.itemHeight = this.$refs.prizeItem[0].clientHeight
    this.groupsHeight = this.itemHeight * this.prizes.length * (this.round + 1)
  },
  methods: {
    startClick () { // 开始抽奖
      if (this.disClick) {
        return
      }
      this.runGame()
    },
    getIndexs () {
      let indexs = []
      const prizeId = this.prizeId
      for (let i = 0; i < prizeId.length; i++) {
        indexs.push(this.prizes.indexOf(prizeId[i]))
      }
      return indexs
    },
    runGame () { // 启动抽奖
      this.disClick = true
      this.resetGame()
      let itemHeight = this.itemHeight
      let groupsHeight = this.round * this.$refs.groupItem[0].clientHeight
      let groups = this.$refs.groups

      groups.forEach((val, i) => {
        let pos = this.getIndexs()[i] * itemHeight + groupsHeight
        setTimeout(() => {
          val.className = 'groups animation-ease'
          val.style.transform = `translate3d(0, -${pos}px, 0)`
        }, i * 300)
      })
    },
    endGame (k) { // 抽奖结束后的回调
      if (k === 6) {
        this.disClick = false
        this.$emit('gameEnd', this.prizeId)
      }
    },
    resetGame () { // 重置状态
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
  height:65px;
  overflow: hidden;
  background: #fff;
  display: flex;
  border: 1px solid #CCC;
  border-right: none;
  .animation-ease{
    transition-property: transform;
    transition-duration: 3s;
    transition-timing-function: ease;
  }

  .groups{
    width:50px;
    text-align: center;

    .prize-item{
      height: 65px;
      font-size: 50px;
      border-right: 1px solid #CCC;

    }
  }
}
</style>
