import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserService } from './../models/User';

passport.use(new LocalStrategy({
    usernameField: 'loginName',
    passwordField: 'password'
  },
  function(loginName, password, done) {
    let userService = new UserService();
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
  }
));
