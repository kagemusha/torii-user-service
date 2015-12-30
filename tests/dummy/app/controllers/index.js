import Ember from 'ember';
import UserActions from '../mixins/user-actions';

export default Ember.Controller.extend( UserActions, {
  userService: Ember.inject.service(),

});
