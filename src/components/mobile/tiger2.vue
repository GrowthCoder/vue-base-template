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
  data () {
    return {
      round: 6, // 转几回合后停下来
      prizes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      disClick: false, // 防止多次点击
      itemHeight: 65, // 每个奖品的高度
      prize_id: '', // 中奖id
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
      // 获取中奖的id
      let index = parseInt(Math.random() * this.prizes.length)
      this.prizd_id = this.prizes[index]
      this.runGame(index)
    },
    runGame (index) { // 启动抽奖
      this.disClick = true
      this.resetGame()
      let itemHeight = this.itemHeight
      let groupsHeight = this.round * this.$refs.groupItem[0].clientHeight
      let groups = this.$refs.groups
      groups.forEach((val, i) => {
        console.log(index, itemHeight, groupsHeight, '1')
        let pos = index * itemHeight + groupsHeight
        console.log(pos, '1')
        setTimeout(() => {
          val.className = 'groups animation-ease'
          val.style.transform = `translate3d(0, -${pos}px, 0)`
        }, i * 300)
      })
    },
    endGame (k) { // 抽奖结束后的回调
      if (k === 3) {
        alert('恭喜您中了' + this.prizd_id)
        this.disClick = false
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
