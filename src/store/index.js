import Vue from 'vue'
import Vuex from 'vuex'
import variable from '../modules/variable'
import transit from '../modules/transit'
import achieve from '../modules/achieve'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    variable,
    transit,
    achieve
  }
});
export default store;
