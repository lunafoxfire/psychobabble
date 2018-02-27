import * as express from 'express';
import { AuthController } from '../../controllers/auth.controller';

let authCtrl = new AuthController();

export let router = express.Router();

// POST /api/auth/register
// Params: email, password
router.post('/register', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  authCtrl.registerAsync(email, password)
    .then(() => {
      res.status(200);
      res.json({
        message: `User registered\n${email} | ${password}`
      });
    })
    .catch((err) => {
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
