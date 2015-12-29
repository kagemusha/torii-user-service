import Ember from 'ember';

export default Ember.Component.extend({
  userService: Ember.inject.service(),
  initEmail: Ember.on('init', function() {
    const rand = Math.floor((Math.random() * 10000));
    const email =  `m${rand}@m.com`;
    this.set('email', email);
  }),
  email: null,
  password: 'tester99',
  passwordConfirmation: 'tester99',

  actions: {
    register() {
      const email = this.get('email');
      const pw = this.get('password');
      const pwConfirm = this.get('passwordConfirmation');
      this.get('userService').register(email, pw, pwConfirm).catch((/*error*/)=> {
        this.set('registrationError', "Registrataion failed. Please try again");
      });
    },
  }
});
