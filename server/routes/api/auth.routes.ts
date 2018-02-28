import * as express from 'express';
import * as passport from 'passport';
import { AuthController } from '../../controllers/auth.controller';

let authCtrl = new AuthController();

export let router = express.Router();

// TODO: Remove all logs with passwords in them

// POST /api/auth/client/register
// Params: email, password
router.post('/client/register', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  authCtrl.registerClientAsync(email, password)
    .then((jwt) => {
      console.log("Registered successfully");
      res.status(200);
      res.json({
        message: `User registered: ${email} | ${password}`,
        token: jwt
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        message: `Registration failed.`
      });
    });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    let token;
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      token = authCtrl.generateJwt(user);
      res.status(200);
      res.json({
        token: token
      });
    }
    else {
      res.status(401).json(info);
    }
  })(req, res);
});
