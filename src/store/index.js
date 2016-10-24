import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    access_token: '',
  },

  mutations: {
    /**
     * Assign/revoke the access_token.
     */
    setToken(state, payload) {
      state.access_token = payload.access_token;
    },

    /**
     * Toggle the application's loading state.
     */
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },

  actions: {

  },

  getters: {
    /**
     * Check if the current user is authenticated.
     */
    isAuthenticated(state) {
      return state.access_token && cookie.get('access_token');
    },
  },
});
