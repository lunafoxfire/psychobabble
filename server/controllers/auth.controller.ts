import * as passport from 'passport';
import { User } from './../models/User';

// https://www.sitepoint.com/user-authentication-mean-stack/
export class AuthController {
  public static registerClient(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if (!username || !email || !password) {
      res.status(400);
      res.json({
        message: "One or more required fields were missing"
      });
    }
    else {
      console.log(`Registering ${username} | ${email}...`)
      User.registerClientAsync(username, email, password)
      .then((user) => {
        if (user) {
          let msg = `Registered ${username} with id ${user.id}`;
          console.log(msg);
          res.status(200);
          res.json({
            message: msg,
            token: user.generateJwt()
          });
        }
        else {
          let msg = `Username or email taken`;
          console.log(msg);
          res.status(422);
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
  }

  public static loginLocal(req, res) {
    let loginName = req.body.loginName;
    passport.authenticate('local', (err, user, info) => {
      console.log(`Logging in ${loginName}...`)
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
      if (user) {
        let msg = `Successfully logged in ${loginName}`;
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
