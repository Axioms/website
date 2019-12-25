import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: '',
    username: '',
    showNotSignedInErrors: {
      notepad: true,
      gradebook: true
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    setJWT(state, jwt) {
      state.jwt = jwt;
    },
    setUsrname(state, username) {
      state.username = username;
    },
    setNotePad(state, bool) {
      state.showNotSignedInErrors.notepad = bool;
    },
    setGradeBook(state, bool) {
      state.showNotSignedInErrors.gradebook = bool;
    }
  },
  actions: {},
  getters: {
    jwt: state => state.jwt,
    username: state => state.username,
    jwtData: (state, getters) => {
      return state.jwt ? JSON.parse(atob(getters.jwt.split(".")[1])) : null;
    },
    jwtUuid: (state, getters) => {
      return getters.jwtData ? getters.jwtData.uuid : null;
    },
    jwtExpTime: (state, getters) => {
      return getters.jwtData ? getters.jwtData.exp : null;
    }
  }
});
