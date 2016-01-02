import Ember from 'ember';

export default Ember.Component.extend({
  userService: Ember.inject.service(),
  email: 't@t.com',
  password: 'tester99',
  classNames: ['login-component'],
  actions: {
    login() {
      let email = this.get('email');
      let password = this.get('password');
      this.attrs.login(email, password);
    },
    logout() {
      this.get('userService').logout();
    }
  }
});
