import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    accessToken: '',

    isLoading: false,

    modalShow: false,
  },

  mutations: {
    /**
     * Assign/revoke the access token.
     */
    setAccessToken(state, payload) {
      state.accessToken = payload.accessToken;
    },

    /**
     * Set the current user's basic information.
     */
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
    },

    /**
     * Show/hide the app modal.
     */
    setModalShow(state, payload) {
      state.modalShow = payload.modalShow;
    },

    /**
     * Toggle the application's loading state.
     */
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },

  actions: {
    /**
     * Commit the current access token, and then fetch the user's info.
     */
    fetchUserInfoFromToken({ commit }, payload) {
      let userInfo = {};
      commit({
        type: 'setAccessToken',
        accessToken: payload.accessToken,
      });

      if (payload.accessToken) {
        Vue.http.get('/api/v1/users/me').then(({ body }) => {
          userInfo = body;
        }).finally(() => {
          commit({
            userInfo,
            type: 'setUserInfo',
          });
        });
      }
    },
  },

  getters: {
    /**
     * Check if the current user is authenticated.
     */
    isAuthenticated(state) {
      return state.accessToken && cookie.get('access_token');
    },
  },
});
