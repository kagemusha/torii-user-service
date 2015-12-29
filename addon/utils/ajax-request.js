import Ember from 'ember';

export function emberAjaxRequest(type, url, data, options) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    let success = function(response) {
      Ember.run(function() {
        resolve(response);
      });
    };

    let error = function(jqxhr, status, error) {
      Ember.run(function() {
        reject(error);
      });
    };
    let requestData = {
      type,
      url,
      data,
      success,
      error,
      dataType: 'json'
    };

    if (options && options.authBefore === true) {
      let authenticationToken = window.localStorage.getItem('authenticationToken');
      requestData.beforeSend = function(xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${authenticationToken}`);
      };
    }

    Ember.$.ajax(requestData);
  });
}
