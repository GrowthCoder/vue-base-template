<template>
    <div class="reward">
        <div class="reward-box">
            <div class="groups animation-ease" v-for="k in 6" @webkitTransitionEnd="endGame(k)">
                <ul class="group-item" v-for="i in (round+1)" >
                    <li class="prize-item" v-for="item in prizes">{{item}}</li>
                </ul>
            </div>
        </div>
        <div  @click="startClick">{{disClick?'抽奖中...':'点击开始'}}</div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data(){
        return {
            round:6,//转几回合后停下来
            prizes:[1,2,3,4,5,6,7,8,9,11,12,13,14,15],
            disClick:false,//防止多次点击
            itemHeight:0,//每个奖品的高度
            prize_id:'',//中奖id
        }
    },
    mounted(){
        this.itemHeight = $('.prize-item').outerHeight()
        $('.groups').css('height',this.itemHeight * this.prizes.length*(this.round+1))
    },
    methods:{
        startClick(){//开始抽奖
            if(this.disClick){
                return
            }
            //获取中奖的id
            let index = parseInt(Math.random()*this.prizes.length);
            this.prizd_id = this.prizes[index];
            this.runGame(index)
        },
        runGame(index){//启动抽奖
            this.disClick = true;
            this.resetGame();
            var itemHeight = this.itemHeight;
            var groupsHeight = this.round*$('.group-item').height();
            $('.groups').each(function(e){
                var pos = index*itemHeight + groupsHeight
                setTimeout(()=>{
                    $(this).addClass('animation-ease').css('transform','translate3d(0, -'+pos+'px, 0)')
                },e*300)
            })
        },
        endGame(k){//抽奖结束后的回调
            if(k==3){
                alert('恭喜您中了'+this.prizd_id)
                this.disClick = false;
            }
        },
        resetGame(){//重置状态
            $('.groups').removeClass('animation-ease').css('transform','');
        }
    }
}
</script>
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}
.reward-box{
    width:750px;
    height:100px;
    overflow: hidden;
    background: #fff;
    display: flex;
    .animation-ease{
        transition-property:transform;
        transition-duration: 3s;
        transition-timing-function: ease;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .groups{
        width:50px;
        text-align: center;
        border: 1px solid #CCC;
        .prize-item{
            height:100px;
            font-size:50px;
        }
    }
}
</style>