/**
 * Created by Administrator on 2017/3/21.
 */
import Vue from "vue"
Vue.directive("Tabs",{
    bind: function(el,binding){
        var lis = $(el).find("ol").children("li")
        $(el).find("ul").children("li").each(function(){
            $(this).on("click",function(){
                $(this).addClass("bg").siblings().removeClass()
                lis.eq($(this).index()).show().siblings().hide();
            })
        })
    }
})