<template>
    <div id="custom">
        <div class="custor-Tab"  v-Tabs>
            <ul>
                <li v-for="(val,index) in Tab" :class="set == index?'bg':''">{{val}}</li>
            </ul>
            <ol>
                <li v-for="(content,index) in contents" v-show="set == index">{{content}}</li>
            </ol>
        </div>
    </div>
</template>
<script>
    import store from '../vuex/store'
    export default {
        data (){
            return {
                set: 0,
                Tab: ["足球生活","足球美女","足球现场"],
                contents: ["内容一","内容二","内容三"]
            }
        },
        mounted () {
            this.$store.dispatch("cur",1)
            //this.cur(1)
        }

    }
</script>

<style>
    .custor-Tab{
        width: 80%;
        margin: 20px auto;
        box-sizing: border-box;
        border: 1px solid #ccc;
        height: 200px;
        text-align: center;
    }
    .custor-Tab ul{
        display: -webkit-flex;
        -webkit-flex-direction: row;
        background: red;
    }
    .custor-Tab ul li{
        -webkit-flex: 1;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .custor-Tab ol{
        padding-top: 20px;
        width: 100%;
    }
    .bg{
        background: greenyellow;
    }
</style>