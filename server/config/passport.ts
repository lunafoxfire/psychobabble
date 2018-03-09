import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './../models/User';
import { UserService } from './../services/user.service';

export function loadPassport(userService: UserService = null) {
  if (!userService) {
    userService = new UserService
  }
  passport.use(new LocalStrategy({
    usernameField: 'loginName',
    passwordField: 'password'
  },
  function(loginName, password, done) {
    userService.findByLoginNameAsync(loginName)
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: `User ${loginName} not found`
        });
      }
      else if (!user.validateLogin(password)) {
        return done(null, false, {
          message: `Incorrect password`
        });
      }
      else {
        return done(null, user);
      }
    })
    .catch(err => done(err));
  }));
}
