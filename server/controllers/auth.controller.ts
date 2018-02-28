import * as passport from 'passport';
import { User } from './../models/User';

// https://www.sitepoint.com/user-authentication-mean-stack/
// TODO: check for malformed requests
export class AuthController {
  public static registerClient(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(`Registering ${email}...`)
    User.registerClientAsync(email, password)
      .then((user) => {
        if (user) {
          let msg = `Registered ${email} with id ${user.id}`;
          console.log(msg);
          res.status(200);
          res.json({
            message: msg,
            token: user.generateJwt()
          });
        }
        else {
          let msg = `User ${email} already exists`;
          console.log(msg);
          res.status(401);
          res.json({
            message: msg
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      })
  }

  public static loginLocal(req, res) {
    let email = req.body.email;
    passport.authenticate('local', (err, user, info) => {
      console.log(`Logging in ${email}...`)
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
      if (user) {
        let msg = `Successfully logged in ${email}`;
        console.log(msg);
        res.status(200);
        res.json({
          message: msg,
          token: user.generateJwt()
        });
      }
      else {
        let msg = `Login failed: ${info.message}`;
        console.log(msg);
        res.status(401).json(info);
      }
    })(req, res);
  }
}
