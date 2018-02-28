import * as jwt from 'express-jwt';

export let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'jwt'
});
