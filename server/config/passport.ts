import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './../models/User';
import { AuthController } from './../controllers/auth.controller';
import { getRepository } from 'typeorm';

let authCtrl = new AuthController();

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    authCtrl.getUserRepo()
      .then(userRepo => {
        userRepo.findOne({email: username})
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: `User ${username} not found`
              });
            }
            if (!authCtrl.validateUser(user, password)) {
              return done(null, false, {
                message: `Incorrect password`
              });
            }
            return done(null, user);
          })
          .catch(err => done(err));
      })
  }
));
