<template>
  <div class="game">
    <game prizeId="123bbb"
      @gameEnd="endGame"></game>
  </div>
</template>

<script>
import game from './game'
export default {
  components: {
    game
  },
  methods: {
    endGame (data) {
      alert('恭喜您中了' + data)
    }
  }
}
</script>
