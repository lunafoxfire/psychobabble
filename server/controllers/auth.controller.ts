import * as passport from 'passport';
import { User, UserService } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';

// https://www.sitepoint.com/user-authentication-mean-stack/
export class AuthController {
  private userService: UserService;

  constructor(userService: UserService = null) {
    this.userService = userService || new UserService();

    let ctrlMethods = Object.getOwnPropertyNames(AuthController.prototype);
    ctrlMethods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  public registerClient(req, res) {
    console.log("###################################");
    console.log(this);
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
      this.userService.registerClientAsync(username, email, password)
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

  public async sendReset(req, res) {
    let sendSuccess = await this.userService.sendPassResetEmail(req.body.email, req.headers.host);
    if(sendSuccess) {
      res.status(200);
      res.json({
        message: "Email Sent"
      })
    } else {
      res.status(401);
      res.json({
        message: "Email Doesn't Exist"
      })
    }
  }

  public async resendResetEmail(req, res) {
    let sendSuccess = await this.userService.resendPasswordResetEmail(req.body.userId, req.headers.host);
    if(sendSuccess) {
      res.status(200);
      res.json({
        message: "Email Sent"
      })
    } else {
      res.status(401);
      res.json({
        message: "Email Failed to Send"
      })
    }
  }

  public async passChange(req, res) {
    let passChangeSuccess = await this.userService.changePassword(req.body.newPass, req.body.userId);
    if(passChangeSuccess === 0) {
      res.status(500);
      res.json({
        message: "Token Expired"
      })
    } else if (passChangeSuccess === 1) {
      res.status(500);
      res.json({
        message: "New Password Cannot Match Old Password"
      })
    } else {
      res.status(200);
      res.json({
        message: "Password Changed"
      })
    }
  }

  public verifyUser(req, res) {
    console.log(req.body)
    if(req.jwt && req.jwt.id) {
      ValidationToken.checkVerify(req.body.code, req.jwt.id).then((user) => {
        res.status(200);
        res.json({
          message: "validated",
          token: user.generateJwt()
        });
      })
    } else {
      res.status(500)
    }
  }

  public async resendVerification(req, res) {
    if(req.jwt && req.jwt.id && req.jwt.email) {
      this.userService.resendValidationEmail(req.jwt.email);
      res.status(200);
      res.json({
        message: "Email Sent"
      })
    } else {
      res.status(500);
      res.json({
        message: "Something went wrong"
      })
    }
  }

  public loginLocal(req, res) {
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
