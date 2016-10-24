import _ from 'lodash';

/**
 * Import plugins and dependencies for Vue.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import store from './store';
import App from './App';
import Home from './components/Home';

/**
 * Configure root Vue instance.
 */
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.interceptors.push((req, next) => {
  _.set(req.headers, 'map', {
    Authorization: [`Bearer ${store.state.access_token}`],
    'X-CSRF-TOKEN': [window.document.querySelector('meta[name=x-csrf-token]').content],
  });
  store.commit('toggleLoading');

  next(() => {
    store.commit('toggleLoading');
  });
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
  ],
});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
