import { getConnection } from 'typeorm';

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
    res.status(200);
    res.json({
      id: "12345",
      email: "example@example.com",
      hash: "abcde",
      salt: "qwerty"
    })
  }
}
