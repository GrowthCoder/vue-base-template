<template>
  <div class="game">
    <game prizeId="111113"
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
