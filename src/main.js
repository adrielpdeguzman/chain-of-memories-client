/**
 * Import plugins and dependencies for Vue.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App';

/**
 * Configure root Vue instance.
 */
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  routes: [

  ],
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
