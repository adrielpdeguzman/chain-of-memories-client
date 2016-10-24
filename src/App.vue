<template lang="pug">
#App
  nav#Navbar
    ul.Navbar__links
      router-link.Navbar__link(to='/', tag='li'): a Home
      .Panel(v-if='!isAuthenticated')
        .Panel__body
          form.Form.Form--inline(method='post', @submit.prevent='submit')
            .Form__errors(v-if='loginForm.errors.length > 0')
              p(v-for='error of loginForm.errors') {{ error }}
            .Form__group
              label.Form__label Username:
                input.Form__input(type='text', required, v-model='loginForm.username')

            .Form__group
              label.Form__label Password:
                input.Form__input(type='password', required, v-model='loginForm.password')

            .Form__group
              label.Form__label Remember Me:
                input.Form__input(type='checkbox', v-model='loginForm.remember')
            button.Button(type='submit') Login
      li.Navbar__link(v-else): a(@click='logout') Logout
  router-view
</template>

<script>
import moment from 'moment';
import cookie from 'js-cookie';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  /**
   * The component's data.
   */
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false,

        errors: [],
      },
    };
  },

  /**
   * Prepare the component.
   */
  created() {
    this.$store.commit({
      type: 'setToken',
      access_token: cookie.get('access_token') || '',
    });
  },

  methods: {
    /**
     * Handle form submit.
     */
    submit() {
      const credentials = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      this.$http.post('/auth/login', credentials).then(({ body }) => {
        cookie.set('access_token', body.token, { expires: this.loginForm.remember ? moment.unix(body.expires).day() : '' });
        this.$store.commit({
          type: 'setToken',
          access_token: body.token,
        });
      }, () => {
        this.loginForm.username = '';
        this.loginForm.password = '';
        this.loginForm.errors = ['Invalid credentials!'];
      });
    },

    /**
     * Log out the current user.
     */
    logout() {
      cookie.remove('access_token');
      this.$store.commit({
        type: 'setToken',
        access_token: '',
      });
    },
  },

  computed: {
    /**
     * Map the store getters.
     */
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
};
</script>
