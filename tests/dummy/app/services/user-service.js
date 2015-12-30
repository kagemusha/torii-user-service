import UserService from 'torii-user-service/services/user-service';

export default UserService.extend({
  debug: true,
  // customize these in your own app
  authServer: 'http://localhost:3000',
  authenticatioPathl: 'users/me',
  loginPath: 'users/sign_in',
  logoutPath: 'users/sign_out',
  registrationPath: 'users'
});
