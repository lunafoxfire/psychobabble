import { fixThis } from './../utility/fix-this';
import * as passport from 'passport';
import { User } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';
import { AuthService } from './../services/auth.service';

// https://www.sitepoint.com/user-authentication-mean-stack/
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService = null) {
    this.authService = authService || new AuthService();
    fixThis(this, AuthController);
  }

  public async registerClient(req, res) {
    try {
      if (!req.body) {
        res.status(400);
        res.json({
          message: "No parameters were sent"
        });
        return;
      }
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      if (!username || !email || !password) {
        res.status(400);
        res.json({
          message: "One or more required fields were missing"
        });
        return;
      }
      console.logDev(`Registering ${username} | ${email}...`);
      let user = await this.authService.registerClientAsync(username, email, password);
      if (user) {
        let msg = `Registered ${username} with id ${user.id}`;
        console.logDev(msg);
        res.status(200);
        res.json({
          message: msg,
          token: user.generateJwt()
        });
        return;
      }
      else {
        let msg = `Username or email taken`;
        console.logDev(msg);
        res.status(422);
        res.json({
          message: msg
        });
        return;
      }
    }
    catch (err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async sendReset(req, res) {
    let sendSuccess = await this.authService.sendPassResetEmail(req.body.email, req.headers.host);
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
    let sendSuccess = await this.authService.resendPasswordResetEmail(req.body.userId, req.headers.host);
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
    let passChangeSuccess = await this.authService.changePassword(req.body.newPass, req.body.userId);
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
    console.logDev(req.body)
    if(req.jwt && req.jwt.id) {
      this.authService.checkValidationCode(req.body.code, req.jwt.id).then((user) => {
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
      this.authService.resendValidationEmail(req.jwt.email);
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
    console.logDev(req.body);
    let loginName = req.body.loginName;
    passport.authenticate('local', (err, user, info) => {
      console.logDev(`Logging in ${loginName}...`)
      if (err) {
        console.logDev(err);
        res.status(500).json(err);
        return;
      }
      if (user) {
        let msg = `Successfully logged in ${loginName}`;
        console.logDev(msg);
        res.status(200);
        res.json({
          message: msg,
          token: user.generateJwt()
        });
      }
      else {
        let msg = `Login failed: ${info.message}`;
        console.logDev(msg);
        res.status(401).json(info);
      }
    })(req, res);
  }
}
