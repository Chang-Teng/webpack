<template>
    <div class="detail">

        <h2><router-link to="/list/home">返回</router-link>详情页</h2>
        <img :src="tiem.img" alt=""/>
        <p>{{tiem.title}}</p>
        <input type=button value=后退 onclick=" window.history.back(-1)">
        <input type=button value=后退 onclick=" window.history.go(-1)">
    </div>
</template>

<script>


    export default{
        name: "detail",
        data(){
            return {
                tiem: {}
            }
        },
        //检测路由是否发生变换  可以解决缓存问题
        watch:{
            '$route': function () {
                this.tiem = this.$route.query;
            }
        },
        mounted(){

            this.tiem = this.$route.query;
//            var id = this.$route.query.id
//            console.log(id)
//            this.$http.get("/data/livelist.json")
//                .then(
//                    (res) => {
//
//                        var data = res.data.data
//                        for(var arr of data){
//                            if(arr.id == id){
//                                this.tiem = arr
//
//                            }
//                        }
//
//                    }
//                )
        }

    }
</script>

<style>
.detail{
    height: 100%;
    width: 100%;
    text-align: center;
}
.detail h2{
    height: 40px !important;
    line-height: 40px ;
    background: green;
    color: #fff;
    text-align: center;
    font-size: 18px ;
}
.detail h2 a{
    position: absolute;
    left: 10px;
    top: 5px;
}
.detail img{
    margin: 20px;
    width: 60%;
    height: auto;
}
.detail b{
    text-align: center;
    font-size: 16px ;
}

</style>