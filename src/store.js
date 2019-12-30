import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: '',
    username: '',
    usedOTP: false,
    siteUpdateDowloaded: false,
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
    setUsername(state, username) {
      state.username = username;
    },
    setUsedOTP(state, usedOTP) {
      state.usedOTP = usedOTP;
    },
    setSiteUpdateDowloaded(state, siteUpdateDowloaded) {
      state.siteUpdateDowloaded = siteUpdateDowloaded;
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
    usedOTP: state => state.usedOTP,
    siteUpdateDowloaded: state => state.siteUpdateDowloaded,
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
