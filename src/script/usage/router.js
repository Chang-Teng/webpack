/**
 * Created by Administrator on 2017/2/17.
 */

import Vue  from "vue"
import VueRouter  from "vue-router"
import VueResource from "vue-resource"
import directive from "./../tpls/directive.js"
import App from '../App.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
import Guide  from "../views/guide.vue"
import List  from "../views/list.vue"
import Home  from "../views/home.vue"
import Contrive  from "../views/contrive.vue"
import My  from "../views/my.vue"
import SignOut  from "../views/SignOut.vue"
import Detail  from "../views/detail.vue"

const routes = [
    { path: '/guide', component: Guide },
    {path: '/detail', component: Detail },
    { path: '/list', component: List,
        children : [
            { path: '/list/home', component: Home },
            { path: '/list/contrive', component: Contrive },
            { path: '/list/my', component: My },
            { path: '/list/SignOut', component: SignOut }

        ]
    },
    { path: '/', redirect:'/guide'}
];

const router = new VueRouter({
    routes : routes// （缩写）相当于 routes: routes
});

new Vue({
    el: "#app",
    router : router,
    template: '<App/>',
    components: { App }
});

