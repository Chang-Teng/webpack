<template>
    <div id="box-home">
        <div class="homes-header">
            <i class="yo-ico">&#xe790;</i>

            <p class="header_p">
                <span :class="p-on">热点</span><span>关注</span>
            </p>
            <i class="yo-ico">&#xe7ad;</i>
        </div>
        <div id="home" class="homes-main">
            <div class=" swiper-container" id="swiper-home">
                <div class="wrapper-home swiper-wrapper">
                    <div class="swiper-slide slide-o">
                        <ul class="main_ul">
                            <li v-for="(item,index) in hotnav" :class="index==hotid?'main_ul_li':''" @click="list(index)">
                                {{item}}
                            </li>
                        </ul>
                        <div class="main-list">
                            <div class=" swiper-container swiper-host" id="swiper-host">
                                <div class="wrapper-host swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div id="wrapper" class="host-div">

                                            <div class="main-div" style="width: 100%">
                                                <!------------------------------------------>
                                                <div id="pullDown" class="">
                                                    <div class="pullDownLabel"></div>
                                                </div>
                                                <div class="pulldown-tips">下拉刷新</div>
                                                <!------------------------------------------>
                                                <ul v-for="item in lists">
                                                    <li>
                                                        <router-link :to="{path:'/detail',query: item[0]}" >
                                                        <img :src="item[0].img" alt=""/>
                                                        <b>{{item[0].title}}</b>
                                                        </router-link>
                                                    </li>
                                                    <li></li>
                                                    <li>
                                                        <router-link :to="{path:'/detail',query: item[1]}" v-if="item.length==1?false:true">
                                                        <img :src="item[1].img" alt="" />
                                                        <b>{{item[1].title}}</b>
                                                        </router-link>
                                                    </li>
                                                </ul>

                                                <!--------------------------------->
                                                <div id="pullUp" class="">
                                                    <div class="pullUpLabel" style="background-color: red">加载更多</div>
                                                </div>
                                                <!------------------------------->
                                            </div>

                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="main-div" style="width: 100%">
                                            2
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="main-div" style="width: 100%">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="swiper-slide slide-o">
                        关注~~
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>


<script>

    export default {
        name: "hot",
        data (){
            return {
                hotnav: ["足球生活", "足球现场", "足球美女"],
                hotid: 0,
                lists: [],
                homeSwiper: null,
                hotSwiper: null
            }
        },
        methods: {
            list(index){
                this.hotSwiper.slideTo(index)
            }
        },
        mounted () {
            this.$http.get("/data/livelist.json")
                   .then(
                        (res) => {
                            function TotwoArry(data){
                                var arr = [];
                                //  定义一个空数组
                                for (var i = 0, len = data.length / 2; i < len; i++) {
                                    arr[i] = []
                                    //  arr空数组中创建i个二维数组
                                    arr[i].push(data[i * 2]);
                                    //  往arr中每个二维数组push data下标 0  2 4对象，
                                    data[i * 2 + 1] && arr[i].push(data[i * 2 + 1]);
                                    //  判断data[i]下标奇数 并且对象中有没有  有就往arr中每个二维数组中再push data下标 1 3 5 对象，
                                }
                                return arr
                            }
                            this.lists = TotwoArry(res.body.data)
                        },(res)=>{

                            console.log("Error")
                        }
                    )

            var that = this;
            setTimeout(function () {
                that.homeSwiper = new Swiper('#swiper-home', {
                    direction: 'horizontal',
                    loop: false
                });
                that.hotSwiper = new Swiper('#swiper-host', {
                    direction: 'horizontal',
                    loop: false,
                    onSlideChangeStart: function (swiper) {
                        that.hotid = swiper.activeIndex;
                    }
                });
                /*----------------------------------*/


                var myScroll,
                        pullDown = $("#pullDown"),
                        pullUp = $("#pullUp"),
                        pullDownLabel = $(".pullDownLabel"),
                        pullUpLabel = $(".pullUpLabel"),
                        container = $('#list'),
                        pullu = $("#pullu"),
                        pullp = $(".pullp"),
                        load = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新
                    pullDown.hide();
                    pullUp.hide();
                //隐藏盒子
                myScroll = new IScroll(".host-div", {
                    probeType: 3,
                    mouseWheel: true
                });
                myScroll.refresh();

                //滚动时候执行
                myScroll.on("scroll",function(){
                    //load等于0的时候执行
                    if(load == 0){
                        if(this.y > 40){//下拉刷新操作
                            //先把原div隐藏
                            $(".pulldown-tips").hide();
                            //并给oulldown添加一个class名
                            pullDown.addClass("refresh").show();
                            //并给pullDownLabel赋值
                            pullDownLabel.text("松手刷新数据");
                            load = 1;
                            myScroll.refresh();
                        }else if(this.y < (this.maxScrollY - 40)){//上拉加载更多
                                //给pullUp添加class样式
                            pullUp.addClass("refresh").show();
                            //修改里的pullUpLabel内容
                            pullUpLabel.text("正在载入");
                            load = 0;
                        }
                    }
                });
                //滚动结束时
                myScroll.on("scrollEnd",function(){
                    //判断是否满足条件
                    if(load == 1){
                       //下拉刷新操作
                        //删除类，并重新添加一个类
                        pullDown.removeClass("refresh").addClass("loading");
                        //修改pullDownLabel的内容
                        pullDownLabel.text("正在刷新");
                        load = 2;
                        //调用函数
                        pullDownAction();

                    }
                });
                //下拉刷新的函数
                function pullDownAction(){
                    //延时调用
                    setTimeout(function(){
                        pullDownLabel.text("正在完成");
                    },1000);
                    setTimeout(function(){
                        //循环添加内容

                        //pullDown的class清空并隐藏
                        pullDown.attr('class','').hide();
                        myScroll.refresh();
                        load = 0;
                        //并把pulldown-tips显示出来
                        $(".pulldown-tips").show();
                    },1200);
                }
                //上拉加载的函数
                function pullUpAction(){

                    setTimeout(function(){
                        pullUp.attr('class','').hide();
                        myScroll.refresh();
                        load = 0;
                    },1200);
                }
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                /*----------------------------------*/
            }, 500);




        }
    }

</script>