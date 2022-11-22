import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    sendVerificationCode({ commit }, username) {
      return AuthService.sendVerificationCode(username).then(
        response => {
          commit('sendCodeSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('sendCodeFailure');
          return Promise.reject(error);
        }
      );
    },
    confirmVerificationCode({ commit }, user) {
      return AuthService.confirmVerificationCode(user).then(
        response => {
          commit('verifyCodeSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('verifyCodeFailure');
          return Promise.reject(error);
        }
      );
    }

    // TODO(21): Add JWT methods here
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    verifyCodeSuccess(state) {
      state.status.loggedIn = false;
    },
    verifyCodeFailure(state) {
      state.status.loggedIn = false;
    },
    sendCodeSuccess(state) {
      state.status.loggedIn = false;
    },
    sendCodeFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
