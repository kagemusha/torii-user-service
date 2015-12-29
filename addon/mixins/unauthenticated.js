import Ember from 'ember';

export default Ember.Mixin.create({
  userService: Ember.inject.service(),
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),

  transitionIfAuthenticated() {
    if (this.get('isLoggedIn')) {
      this.transitionTo('home');
    }
  }
});
