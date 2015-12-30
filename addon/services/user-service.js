import Ember from 'ember';
const MUST_CUSTOMIZE_MSG = 'must-customize (see torii-user-service/services/user-service';

const { computed } = Ember;

export default Ember.Service.extend({
  authServer: MUST_CUSTOMIZE_MSG,
  authenticationUrl: MUST_CUSTOMIZE_MSG,
  loginPath: MUST_CUSTOMIZE_MSG,
  logoutPath: MUST_CUSTOMIZE_MSG,
  registrationPath: MUST_CUSTOMIZE_MSG,

  loginUrl: computed('authServer', 'loginPath', function(){
    return this.getAbsolutePath(this.get('loginPath'));
  }),
  logoutUrl: computed('authServer', 'logoutPath', function(){
    return this.getAbsolutePath(this.get('logoutPath'));
  }),
  registrationUrl: computed('authServer', 'registrationPath', function(){
    return this.getAbsolutePath(this.get('registrationPath'));
  }),
  getAbsolutePath(relativePath) {
    return `${this.get('authServer')}/${relativePath}`;
  },

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
  },
});
