import { getConnection, getRepository } from 'typeorm';
import { User } from './../models/User';
import { Role } from './../models/Role';
import * as AWS from 'aws-sdk';
AWS.config.update({accessKeyId: process.env.VIDEO_ACCESS_KEY, secretAccessKey: process.env.VIDEO_SECRET_KEY})
import * as fs from 'fs';
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

  public static uploadVideo(req, res) {
    if(req.jwt && req.jwt.id) {
      if(req.jwt.role === "ADMIN") {
        let s3 = new AWS.S3();
        let myBucket = "epicodus-internship";
        let myKey = 'mp4';
        console.log(req);
        fs.readFile(req.body, function(err, data) {
          if(err) { res.status(500); console.log(`There was an error: ${err}`); }
          let params = {Bucket: myBucket, Key: myKey, Body: data, ACL:'public-read'};
          s3.putObject(params, function(err, data) {
            if(err) {
              console.log(`There was an error: ${err}`);
              res.status(500);
            } else {
              console.log(`successfully uploaded data to ${myBucket}/${myKey}`);
              res.status(200);
            }
          })
        })
      }
    }
    res.status(500);
    console.log("Naughty naughty");
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
    if (req.jwt && req.jwt.id) {
      getRepository(User).findOneById(req.jwt.id)
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
