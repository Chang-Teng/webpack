/**
 * Created by Administrator on 2017/2/15.
 */


import router from "../usage/router"

var homeSwrper = null;
var hostSwript = null;
var myScroll = null;


setTimeout(function(){
    homeSwrper = new Swiper("#swiper-home",{
})
hostSwript = new Swiper("#swiper-host",{

})
//IScollÐ§¹û
new IScroll("#wrapper", {
    probeType: 2
});

},500)