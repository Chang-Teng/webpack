/**
 * Created by Administrator on 2017/1/11.
 */


//首页
function guideCtrol($scope,$http){
    new Swiper(".swiper-o",{
        /*滚动方向*/
        direction:"horizontal"
    });

}
function listCtrl($scope, $state){
    $state.go("list.home");
    $scope.name = false;
    $scope.fn = function(){
        $scope.name = false
    }
}
function homeCtrl($state,$scope){
    $state.go("list.home.host");
}

function hostCtrl($http,$scope){
    $http.get("data/livelist.json")
        .success(function(data){
            $scope.data = data.data
        });



   /* new IScroll("#wrapper", {
        probeType: 2
    });
*/
    var  mySwiper = new Swiper(".swiper-host",{
        /*滚动方向*/
        direction:"horizontal",
        /*是否手指滑动效果*/
        touchRatio: 1,
        /*第几个swiper的位置*/
        initialSlide: 0,
        onSlideChangeStart: function (swiper) {
            //当前的下标
            var idx = swiper.activeIndex;
            //主页4项tab滑动
            showCurr(idx)
        }
    });

    function showCurr(id) {
        $(".main_ul").children().eq(id).addClass("main_ul_li").siblings().removeClass();
    }

    //主页4项tab切换
    var mls = $(".main_ul").children("li");
    mls.on("click", function () {
        //点击的第几个下标
        var index = $(this).index();
        mls.eq(index).addClass("main_ul_li").siblings().removeClass();
        mySwiper.slideTo(index);
    });

}

angular.module("mapp")
    //引导页
    .controller("guideCtrl",guideCtrol)
    .controller("listCtrl",listCtrl)
    .controller("homeCtrl",homeCtrl)
    .controller("hostCtrl",hostCtrl)
;
