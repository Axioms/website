import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    JWT: '',
    showNotSignedInErrors: {
      notepad: true,
      gradebook: true
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    setJWT(state, jwt) {
      state.JWT = jwt;
    },
    setNotePad(state, bool) {
      state.showNotSignedInErrors.notepad = bool;
    },
    setGradeBook(state, bool) {
      state.showNotSignedInErrors.gradebook = bool;
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
