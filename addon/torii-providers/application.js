import Ember from 'ember';
import { emberAjaxRequest } from 'torii-user-service/utils/ajax-request';

export default Ember.Object.extend({
  userService: Ember.inject.service(),
  open(credentials) {
    const authUrl = "http://localhost:3000/users/sign_in"; // this.get('userService.loginUrl');
    Ember.assert(authUrl, "userService.authenticationUrl needs to be defined");
    return emberAjaxRequest('POST', authUrl, credentials);
  }
});
