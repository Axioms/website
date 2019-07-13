import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    JWT: ''
  },
  plugins: [createPersistedState()],
  mutations: {
    setJWT(state, jwt) {
      state.JWT = jwt;
    }
  },
  actions: {

  },
  getters: {
    jwt: state => state.JWT,
    jwtData: (state, getters) => {return state.JWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null},
    jwtUser: (state, getters) => {return getters.jwtData ? getters.jwtData.user : null}
  }
})
