import * as express from 'express';
import { AuthController } from '../../controllers/auth.controller';

let authCtrl = new AuthController();

export let router = express.Router();

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
      res.status(500);
      res.json({
        message: `Registration failed.`
      });
    });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
let email = req.body.email;
let password = req.body.password;
authCtrl.loginAsync(email, password)
  .then(() => {
    res.status(200);
    res.json({
      message: `User logged in\n${email} | ${password}`
    });
  })
  .catch((err) => {
    res.status(500);
    res.json({
      message: `login failed.`
    });
  });
});
