import * as passport from 'passport';
import { User } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';
import { Video } from './../models/Video';
import * as AWS from 'aws-sdk';
// https://www.sitepoint.com/user-authentication-mean-stack/
export class AuthController {
  public static registerClient(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if (!username || !email || !password) {
      res.status(400);
      res.json({
        message: "One or more required fields were missing"
      });
    }
    else {
      console.log(`Registering ${username} | ${email}...`)
      User.registerClientAsync(username, email, password)
      .then((user) => {
        if (user) {
          let msg = `Registered ${username} with id ${user.id}`;
          console.log(msg);
          res.status(200);
          res.json({
            message: msg,
            token: user.generateJwt()
          });
        }
        else {
          let msg = `Username or email taken`;
          console.log(msg);
          res.status(422);
          res.json({
            message: msg
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      })
    }
  }

  public static async sendReset(req, res) {
    let sendSuccess = await User.sendPassResetEmail(req.body.email, req.headers.host);
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

  public static async getBucket(req, res) {
    if(req.jwt.role = "ADMIN") {
      let s3 = new AWS.S3();
      s3.config.update({
        accessKeyId: process.env.VIDEO_ACCESS_KEY,
        secretAccessKey: process.env.VIDEO_SECRET_KEY
      })
      let videoId = await Video.createEmptyVideo()
      let params = {
        ACL: "public-read",
        Bucket: process.env.BUCKET_NAME,
        ContentType: 'video/mp4',
        Expires: 100,
        Key: req.jwt.username+"/"+videoId+".mp4",
      }
      return s3.getSignedUrl('putObject', params, function (err, url) {
        if(!err) {
          res.status(200);
          res.json({
            url: url,
            reference: `${process.env.BUCKET_NAME}/${req.jwt.username}/${videoId}.mp4`,
            acl: params.ACL,
            bucket: params.Bucket,
            key: params.Key,
            contentType: params.ContentType,
            videoId: videoId
          });
        } else {
          console.log(err);
          res.status(400);
          res.json({
            message: "Something went wrong"
          })
        }
      });
    } else {
      res.status(401);
      res.json({
        message: "Not Authorized"
      })
    }
  }

  public static async uploadVideo(req, res) {
    if(req.jwt.role = "Admin") {
      let result = await Video.uploadAsync({
        id: req.body.videoId,
        url: req.body.url,
        description: null // TODO: Actually get description and tags from form
      });
      if(result) {
        res.status(200);
        res.json({
          message: "Video Successfully Uploaded"
        })
      } else {
        res.status(500);
        res.json({
          message: "Something Went Wrong"
        })
      }
    } else {
      res.status(401);
      res.json({
        message: "Not Authorized"
      })
    }
  }

  public static async removeVideo(req, res) {
    if(req.jwt.role === "ADMIN") {
      let deleted = await Video.deleteVideoId(req.body.videoId).then((bool) => {
        if(bool) {
          res.status(200);
          res.json({
            message: "Temporary Video Id Removed"
          })
        } else {
          res.status(500);
          res.json({
            message: "Deletion Failed"
          })
        }
      }).catch(() => {
        res.status(500);
        res.json({
          message: "Deletion Failed"
        })
      });
    } else {
      res.status(401);
      res.json({
        message: "Not Authorized"
      })
    }
  }

  public static verifyUser(req, res) {
    console.log(req.body)
    if(req.jwt && req.jwt.id) {
      ValidationToken.checkVerify(req.body.code, req.jwt.id).then((user) => {
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

  public static loginLocal(req, res) {
    let loginName = req.body.loginName;
    passport.authenticate('local', (err, user, info) => {
      console.log(`Logging in ${loginName}...`)
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
      if (user) {
        let msg = `Successfully logged in ${loginName}`;
        console.log(msg);
        res.status(200);
        res.json({
          message: msg,
          token: user.generateJwt()
        });
      }
      else {
        let msg = `Login failed: ${info.message}`;
        console.log(msg);
        res.status(401).json(info);
      }
    })(req, res);
  }
}
