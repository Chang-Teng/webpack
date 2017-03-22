import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import * as actions from './actions'
import * as getters from './getters'

const state = {
    curIndex : 0
}
//¸Ä±äÖµ
const mutations = {
    cur(state,tabIndex){
        state.curIndex = tabIndex
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})