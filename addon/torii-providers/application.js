import Ember from 'ember';
import { emberAjaxRequest } from 'torii-user-service/utils/ajax-request';

export default Ember.Object.extend({
  userService: Ember.inject.service(),
  open(credentials) {
    const loginUrl = this.get('userService.loginUrl');
    //todo: validate url since by default will have a msg to customize
    Ember.assert(loginUrl, "userService.authenticationUrl needs to be defined");
    //todo: make this a debug msg
    console.log(`loginUrl: ${loginUrl}`);
    console.log(`credential`, credentials);
    return emberAjaxRequest('POST', loginUrl, credentials);
  }
});
