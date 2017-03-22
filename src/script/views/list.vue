<template>
    <div id="box-list">
        <div id="list" class="home">
            <!--<keep-alive>-->
                <router-view></router-view>
            <!--</keep-alive>-->
        </div>

        <div class="home-footer">
            <div class="home-nav">
                <dl v-for="(item,index) in name" :class="index == curIndex?'on':''" @click="cur(index)">
                <router-link  :to="item.to" >
                    <dt><i class="yo-ico" v-html="item.text"></i></dt>
                    <dd>{{item.title}}</dd>
                </router-link>
                 </dl>
                <!--<router-link to="/list/home" active-class="on" tag="dl">-->
                    <!--<dt><i class="yo-ico">&#xe751;</i></dt>-->
                    <!--<dd>首页</dd>-->
                <!--</router-link>-->
                <!--<router-link to="/list/contrive" active-class="on" tag="dl">-->
                    <!--<dt><i class="yo-ico">&#xe610;</i></dt>-->
                    <!--<dd>发现</dd>-->
                <!--</router-link>-->
                <!--<dl></dl>-->
                <!--<router-link to="/list/my" active-class="on" tag="dl">-->
                    <!--<dt><i class="yo-ico">&#xe788;</i></dt>-->
                    <!--<dd>我的</dd>-->
                 <!--</router-link>-->
                <!--<dl>-->
                    <!--<dt><i class="yo-ico">&#xe770;</i></dt>-->
                    <!--<dd>退出</dd>-->
                <!--</dl>-->
            </div>
            <div class="nav-s">
                <i class="yo-ico">&#xe77e;</i>
            </div>
        </div>
    </div>

</template>
<script>
    import store from '../vuex/store'
    //import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
  export default {
      data()
      {
          return {
              name: [
                  {"title": "首页", "text": "&#xe751;", "to": "home", "id": 1},
                  {"title": "发现", "text": "&#xe610;", "to": "contrive", "id": 2},
                  {"title": "", "text": "", "to": "", "id": 3},
                  {"title": "我的",   "text": "&#xe788;", "to": "my", "id": 4},
                  {"title": "退出", "text": "&#xe770;", "to": "SignOut", "id": 5}
              ]
          }
      }
      ,
      computed:{
        ...mapGetters([
              'curIndex'
          ])
      },
//      methods: {
//          ...mapActions([
//              'cur'
//          ])
//      },
      methods: {
         cur(index){
             this.$store.dispatch("cur",index)
         }
      },
      store
  }
</script>