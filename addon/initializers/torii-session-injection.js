export default {
  name: 'torii-session-on-adapter',
  after: 'torii-session',
  initialize(app) {
    app.inject('adapter', 'session', 'service:session');
    app.inject('service:user-service', 'session', 'service:session');
  }
};
