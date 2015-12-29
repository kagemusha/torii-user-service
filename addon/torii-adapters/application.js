import Ember from 'ember';

export default Ember.Object.extend({
  userService: Ember.inject.service(),
  currentUser: Ember.computed.alias("userService.currentUser"),

  pushUserToStore(userData) {
    let store = this.get('store');
    store.pushPayload('user', userData);
    // if this is json-api will be userData.data.id - may want to make this adapter aware
    let userId = userData.user.id;
    const user = store.peekRecord('user', userId);
    this.set('currentUser', user);
    return user;
  },
  open(response) {
    const user = this.pushUserToStore(response);
    window.localStorage.setItem('authenticationToken', user.get('authenticationToken'));
    return Ember.RSVP.Promise.resolve({ currentUser: user });
  },
  fetch() {
    const self = this;
    return new Ember.RSVP.Promise( (resolve, reject)=> {
      let authenticationToken = window.localStorage.getItem('authenticationToken');
      if (!authenticationToken) {
        reject("No authenticationToken present");
      }

      const success = (response)=> {
        Ember.run(()=> {
          const user = self.pushUserToStore(response);
          window.localStorage.setItem('authenticationToken', user.get('authenticationToken'));
          resolve({ currentUser: user });
        });
      };

      const error = (jqxhr, status, error)=> {
        Ember.run(()=> {
          reject(error);
        });
      };
      console.log(`authUrl: ${this.get('userService.authenticationUrl')}`);
      Ember.assert(this.get('userService.authenticationUrl'), "userService.authenticationUrl needs to be defined");
      Ember.$.ajax({
        type: 'GET',
        url: this.get('userService.authenticationUrl'),
        beforeSend: (xhr)=> {
          xhr.setRequestHeader('Authorization', `Bearer ${authenticationToken}`);
        },
        success,
        error,
        dataType: 'json'
      });
    });
  },
  unloadRecords() {
    // unload any user data when logout
    // const store = this.get('store');
  },
  close() {
    return new Ember.RSVP.Promise((resolve, reject)=> {
      let authenticationToken = window.localStorage.getItem('authenticationToken');

      let success = ()=> {
        const store = this.get('store');
        Ember.run(()=> {
          this.unloadRecords();
          store.unloadRecord(this.get('currentUser'));
          this.set('currentUser', null);
          //not sure why above lines must be in this run loop, but tests object otherwise (says autorun turned off in testing...)
          window.localStorage.removeItem('authenticationToken');
          resolve();
        });
      };

      let error = (jqxhr, status, error)=> {
        Ember.run(()=> {
          reject(error);
        });
      };

      Ember.$.ajax({
        type: "DELETE",
        url: this.get('userService.logoutUrl'),
        beforeSend: (xhr)=> {
          xhr.setRequestHeader('Authorization', `Bearer ${authenticationToken}`);
        },
        success,
        error,
        dataType: 'text'
      });
    });
  }

});
