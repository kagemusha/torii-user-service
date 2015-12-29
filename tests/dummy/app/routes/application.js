import Ember from 'ember';
import UserActions from '../mixins/user-actions';

export default Ember.Route.extend(UserActions, {
  actions: {
    accessDenied() {
      this.transitionTo('login');
    },
  }
});
