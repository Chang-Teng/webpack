<template>
    <div id="box-home">
        <div class="homes-header">
            <i class="yo-ico">&#xe790;</i>

            <p class="header_p">
                <span @click="head(0)" :class="heads == 0?'p-on':''">热点</span><span @click="head(1)" :class="heads == 1?'p-on':''">关注</span>
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
                                                <div class="head">
                                                    <img src="/img/arrow.png" alt="">
                                                    <span>下拉刷新</span>
                                                </div>
                                                <!------------------------------------------>
                                                <ul>
                                                    <router-link  v-for="item in lists" :to="{path:'/detail',query:item}" tag="li">
                                                        <img :src="item.img" alt=""/>
                                                        <b>{{item.title}}</b>
                                                    </router-link>
                                                </ul>
                                                <!-------------------------------------->
                                                <div class="foot">
                                                    <img src="/img/arrow.png" alt="">
                                                    <span>上拉加载</span>
                                                </div>
                                                <!-------------------------------------->
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
                hotSwiper: null,
                heads : 0
            }
        },
        methods: {
//            ...mapActions([
//                    'cur'
//                ]),
            head(index){
              this.heads = index
              this.homeSwiper.slideTo(index)
            },
            list(index){
                this.hotSwiper.slideTo(index)
            }
        },

        mounted () {
//                this.cur(0)
                this.$store.dispatch("cur",0)
                this.$http.get("/data/livelist.json")
                   .then(
                        (res) => {
                            this.lists = res.body.data
                        },(res)=>{

                            console.log("Error")
                        }
                    )

            var that = this;
            setTimeout(function () {
                that.homeSwiper = new Swiper('#swiper-home', {
                    direction: 'horizontal',
                    loop: false,
                    onSlideChangeStart: function (swiper){
                        that.heads = swiper.activeIndex;
                    }
                });
                that.hotSwiper = new Swiper('#swiper-host', {
                    direction: 'horizontal',
                    loop: false,
                    onSlideChangeStart: function (swiper) {
                        that.hotid = swiper.activeIndex;
                    }
                });

                /*-------------------------------------------------------*/
                var mainScroll = new IScroll(".host-div")
                // 下拉刷新和上拉加载
                var mainScroll = new IScroll(".host-div",{
                    scrollbars: true,
                    mouseWheel: false,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    scrollY: true,
                    probeType: 2,
                    bindToWrapper: true,
                    click: true,
                    preventDefauit: false

                }); // 获取iscroll的实例
                var scrollSize = 40;
                // 隐藏下拉刷新
                mainScroll.scrollBy(0,-scrollSize);
                // 获取head中的img及head当前的状态
                var headImg = $(".head img");
                var topImgHasClass = headImg.hasClass("up");
                var footImg = $(".foot img");
                var bottomImgHasClass = footImg.hasClass("down");

                // 当滚动的时候
                mainScroll.on("scroll",function(){
                    // 获取当前滚动条的位置
                    var y = this.y;
                    // 计算最大的滚动范围
                    var maxY = this.maxScrollY - y;

                    // 如果是下拉
                    if(y>=0){
                        !topImgHasClass && headImg.addClass("up");
                        return "";
                    }
                    // 如果是上拉
                    if(maxY>=0){
                        !bottomImgHasClass && footImg.addClass("down");
                        return "";
                    }
                })

                // 当滚动结束刷新数据时
                mainScroll.on("scrollEnd",function(){
                    if(this.y >= -scrollSize && this.y < 0){
                        mainScroll.scrollTo(0,-scrollSize);
                        headImg.removeClass("up");
                    }else if(this.y>=0){
                        headImg.attr("src","/img/ajax-loader.gif");
                        setTimeout(function(){
                            that.$http.get("/data/list.json")
                                .then(
                                    (res) => {
                                        that.lists = res.data.data
                                        setTimeout(function(){
                                            mainScroll.refresh();
                                        },200)
                                        mainScroll.scrollTo(0,-scrollSize);
                                        headImg.removeClass("up");
                                        headImg.attr("src","/img/arrow.png");
                                    }
                                )
                        },1000)
                    }
                    // 计算最大的滚动范围
                    var maxY = this.maxScrollY - this.y;
                    var self = this;
                    if(maxY>-scrollSize && maxY<0){
                        mainScroll.scrollTo(0,this.maxScrollY+scrollSize);
                        footImg.removeClass("down");
                    }else if(maxY>=0){
                        footImg.attr("src","/img/ajax-loader.gif");
                        setTimeout(function(){
                            that.$http.get("/data/home.json")
                                .then(
                                    (res) => {
                                        var num =  that.lists
                                        that.lists =num.concat(res.data.data);
                                        setTimeout(function(){
                                            mainScroll.refresh();
                                            footImg.removeClass("down");
                                            mainScroll.scrollTo(0,self.y+30);
                                            footImg.attr("src","/img/arrow.png");
                                        },200)
                                    }
                                )
                        },1000)

                    }

                })
                /*-------------------------------------------------------*/

            }, 500);




        }
    }

</script>