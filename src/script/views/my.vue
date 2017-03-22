
<template>
    <div id="my">
        <div class="my-randow">
            <ul class="ul-randow">
                <li v-for="(ran,index) in Randoms" :class="ran == ''?'on':''" @click="random(ran,index)">
                    {{ran}}
                </li>
            </ul>
        </div>
        <div class="but" @click="but">重置</div>
    </div>

</template>


<script>
    import store from '../vuex/store'
    //import {mapActions} from 'vuex'
    export default {
        data (){
            return {
                Randoms: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'']
            }
        },
//       methods: {

//            ...mapActions([
//                'cur'
//            ])
//      },
        mounted () {
            this.$store.dispatch("cur",3)
            //this.cur(1)
        },
        methods :{
            but (){
                this.Randoms = [];
                for(var i=1;this.Randoms.length<15;i++){
                    var str = Math.floor(Math.random()*15)+1;
                    if(this.Randoms.indexOf(str) == -1){
                        this.Randoms.push(str)
                    }
                }
                this.Randoms.push('');
                console.log(this.Randoms)
            },
            random(ran,index){
                var  curNum = this.Randoms[index],
                leftNum = this.Randoms[index - 1],
                rightNum = this.Randoms[index + 1],
                topNum = this.Randoms[index - 4],
                bottomNum = this.Randoms[index + 4]

                // 和为空的位置交换数值
                if (leftNum === '' && index % 4) {
                    //console.log(index)
                    this.$set(this.Randoms,index - 1, curNum)
                    this.$set(this.Randoms,index, '')
                } else if (rightNum === '' && 3 !== index % 4) {
                    this.$set(this.Randoms,index + 1, curNum)
                    this.$set(this.Randoms,index, '')
                } else if (topNum === '') {
                    this.$set(this.Randoms,index - 4, curNum)
                    this.$set(this.Randoms,index, '')
                } else if (bottomNum === '') {
                    this.$set(this.Randoms,index + 4, curNum)
                    this.$set(this.Randoms,index, '')
                }


            }
        },

    }
</script>
<style>
    #my{
        height: 100%;
        width: 100%
    }
    .ul-randow{
        width: 2.5rem;
        height: 2.5rem;
        margin: 20px auto;
        border: 1px solid #ccc;
        display: -webkit-flex;
        -webkit-flex-wrap: wrap;
        box-shadow: 1px 1px 4px;
    }
    .ul-randow li{
        text-align: center;
        line-height: .625rem;
        box-sizing: border-box;
        width: .625rem;
        height: .625rem;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 4px;
        text-shadow: 1px 1px 1px #B9B4B4;
        cursor: pointer;
        background: greenyellow;
    }
    .ul-randow li.on{
        background: #ccc;
        font-size: 0rem;
    }
    .but{
        margin-left: 10%;
        width: 80%;
        height: 30px;
        text-align: center;
        background: goldenrod;
        line-height: 30px;
    }
</style>