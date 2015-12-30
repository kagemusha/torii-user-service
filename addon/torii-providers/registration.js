import Ember from 'ember';
import { emberAjaxRequest } from 'torii-user-service/utils/ajax-request';

export default Ember.Object.extend({
  userService: Ember.inject.service(),

  open(credentials) {
    return emberAjaxRequest("POST", this.get('userService.registrationUrl'), credentials);
  }
});
