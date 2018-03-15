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
          message: "Request body was missing"
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

  public async registerSubject(req, res) {
    try {
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Request body was missing"
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
      let user = await this.authService.registerSubjectAsync(username, email, password);
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

  public async loginLocal(req, res) {
    if (!req.body) {
      res.status(400);
      res.json({
        message: "Request body was missing"
      });
      return;
    }
    let loginName = req.body.loginName;
    let password = req.body.password;
    if (!loginName || !password) {
      res.status(400);
      res.json({
        message: "One or more required fields were missing"
      });
      return;
    }
    passport.authenticate('local', (err, user, info) => {
      console.logDev(`Logging in ${loginName}...`);
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
        return;
      }
      else {
        let msg = `Login failed: ${info.message}`;
        console.logDev(msg);
        res.status(401).json(info);
      }
    })(req, res);
  }



  public async sendResetEmail(req, res) {
    try {
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Request body was missing"
        });
        return;
      }
      if (!req.headers) {
        res.status(400);
        res.json({
          message: "Request headers were missing"
        });
        return;
      }
      if (!req.body.email) {
        res.status(400);
        res.json({
          message: "Email parameter missing"
        });
        return;
      }
      if (!req.headers.host) {
        res.status(400);
        res.json({
          message: "Host header missing"
        });
        return;
      }
      let sendSuccess = await this.authService.sendPassResetEmail(req.body.email, req.headers.host);
      if(sendSuccess) {
        res.status(200);
        res.json({
          message: "Email Sent"
        });
        return;
      } else {
        res.status(422);
        res.json({
          message: "Email Doesn't Exist"
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

  public async resendResetEmail(req, res) {
    try {
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Request body was missing"
        });
        return;
      }
      if (!req.headers) {
        res.status(400);
        res.json({
          message: "Request headers were missing"
        });
        return;
      }
      if (!req.body.userId) {
        res.status(400);
        res.json({
          message: "userId parameter missing"
        });
        return;
      }
      if (!req.headers.host) {
        res.status(400);
        res.json({
          message: "Host header missing"
        });
        return;
      }
      let sendSuccess = await this.authService.resendPasswordResetEmail(req.body.userId, req.headers.host);
      if(sendSuccess) {
        res.status(200);
        res.json({
          message: "Email Sent"
        });
        return;
      } else {
        res.status(422);
        res.json({
          message: "Email Failed to Send"
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

  public async passChange(req, res) {
    try {
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Request body missing"
        });
        return;
      }
      if (!req.body.newPass || !req.body.userId || !req.body.token) {
        res.status(400);
        res.json({
          message: "One or more requeired parameters were missing"
        });
        return;
      }
      let passChangeSuccess = await this.authService.changePassword(req.body.newPass, req.body.userId, req.body.token);
      if(passChangeSuccess === 0) {
        res.status(401);
        res.json({
          message: "Invalid token"
        });
        return;
      } else if (passChangeSuccess === 1) {
        res.status(422);
        res.json({
          message: "New Password Cannot Match Old Password"
        });
        return;
      } else if (passChangeSuccess === 2) {
        res.status(200);
        res.json({
          message: "Password Changed"
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

  public async verifyUser(req, res) {
    try {
      if (!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if (!req.jwt.id) {
        res.status(400);
        res.json({
          message: "Auth token is malformed"
        });
        return;
      }
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Request body is missing"
        });
        return;
      }
      if (!req.body.code) {
        res.status(400);
        res.json({
          message: "Parameter 'code' is missing"
        });
        return;
      }
      let user = await this.authService.checkValidationCode(req.body.code, req.jwt.id);
      if (user) {
        res.status(200);
        res.json({
          message: "User successfully validated",
          token: user.generateJwt()
        });
        return;
      }
      else {
        res.status(401);
        res.json({
          message: "User validation failed"
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

  public async resendVerification(req, res) {
    try {
      if (!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if (!req.jwt.email) {
        res.status(400);
        res.json({
          message: "Auth token malformed"
        });
        return;
      }
      await this.authService.resendValidationEmail(req.jwt.email);
      res.status(200);
      res.json({
        message: "Validation email sent"
      });
      return;
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }
}
