import Vue from 'vue'
import Vuex from 'vuex'
import notebooks from './modules/notebooks'
import note from './modules/note'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebooks,
    note,
    user,
  }
})
