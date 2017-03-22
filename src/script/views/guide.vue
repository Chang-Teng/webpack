<template>
    <div id="guide">
        <div class="swiper-container swiper-o">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in img">
                    <img :src="item" alt=""/>
                    <router-link to="list/home" class="guide-but" v-if="index == 3">

                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'guide',
        data(){
            return {
                img : [
                    '/img/slide1.png',
                    '/img/slide2.png',
                    '/img/slide3.png',
                    '/img/slide4.png'
                ]
            }
        },
        mounted () {
            var swiper = new Swiper('.swiper-o', {
                effect: 'coverflow',
                slidesPerView: 1,
                centeredSlides: true
            });
        }
    }
</script>