import Ember from 'ember';

export default Ember.Mixin.create({
  authRoute: 'home',
  userService: Ember.inject.service(),
  actions: {
    login(email, password) {
      this.get('userService').login(email, password).then(()=> {
        this.set('loggingIn', false);
        this.set('loginError', '');
        if (this.isController) {
          this.transitionToRoute(this.get('authRoute'));
        } else {
          this.transitionTo(this.get('authRoute'));
        }
      }).catch((/*error*/)=> {
        this.set('loginError', "Login failed. Please try again");
      });
    },
    logout() {
      this.get('userService').logout().then(()=>{
        this.transitionTo('login');
      }).catch(()=> {
        Ember.Logger.log('Logout failed');
      }).finally(()=> {
        this.set('loggingOut', false);
      });
    }
  }
});
