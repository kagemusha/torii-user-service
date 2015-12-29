import Ember from 'ember';

export default Ember.Controller.extend({
  userService: Ember.inject.service(),
  isLoggedIn: Ember.computed.readOnly('userService.isLoggedIn'),
});
