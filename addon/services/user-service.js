import Ember from 'ember';
const MUST_CUSTOMIZE_MSG = 'must-customize (see torii-user-service/services/user-service';

export default Ember.Service.extend({
  authenticationUrl: MUST_CUSTOMIZE_MSG,
  loginUrl: MUST_CUSTOMIZE_MSG,
  logoutUrl: MUST_CUSTOMIZE_MSG,
  registrationUrl: MUST_CUSTOMIZE_MSG,

  currentUser: null,
  isLoggedIn: Ember.computed.notEmpty('currentUser'),
  login(email, password) {
    let session = this.get('session');
    this.set('loggingIn', true);
    return session.open('application', {
      user: {
        email,
        password,
      }
    });
  },
  logout() {
    if (this.get('loggingOut')) {
      return;
    }
    this.set('loggingOut', true);

    return this.get('session').close('application');
  },
  register(email, password, passwordConfirmation) {
    const session = this.get('session');
    return session.open('registration', {
      user: {
        email,
        password,
        passwordConfirmation,
      }
    });
  }
});
