import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

import {state,mutations,getters} from "./mutations";
import actions from "./actions";
import menu from './modules/menu'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu
    }
})