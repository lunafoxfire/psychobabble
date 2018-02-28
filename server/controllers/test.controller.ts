import { getConnection } from 'typeorm';
import { User } from '../models/User';
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

  public static pc(req, res) {
    getConnection().getRepository(User).findOne({normalized_email: 'ADAMTITUS76@GMAIL.COM'}).then((response) => {
      let id = response.id;
      res.status(200);
      res.json({
        message: id
      })
    }).catch((err) => {
      console.log(err);
      res.status(500);
    })
  }

  public static getTestUserData(req, res) {
    res.status(200);
    res.json({
      id: "12345",
      email: "example@example.com",
      hash: "abcde",
      salt: "qwerty"
    })
  }
}
