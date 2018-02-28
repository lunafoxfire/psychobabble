import { getConnection, getRepository } from 'typeorm';
import { User } from './../models/User';
import { Role } from './../models/Role';

export class TestController {
  public static getTestMessage(req, res) {
    res.status(200);
    res.json({
      message: "Hello from our Express API"
    })
  }

  public static getTimeFromDb(req, res) {
    getConnection().query("SELECT NOW()")
      .then((response) => {
        let time = response[0].now;
        res.status(200);
        res.json({
          message: time
        })
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  }

  public static getTestUserData(req, res) {
    if (req.jwt && req.jwt.id) {
      getRepository(User).findOneById(req.jwt.id, {relations: ["role"]})
        .then((user) => {
          if (user) {
            res.status(200);
            res.json({
              id: user.id,
              email: user.email,
              role: user.role.name,
              hash: user.hash,
              salt: user.salt
            });
          }
          else {
            res.status(400);
            res.json({
              message: "User does not exist"
            });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
        });
    }
    else {
      res.status(401);
      res.json({
        message: "Invalid token"
      });
    }

  }
}
