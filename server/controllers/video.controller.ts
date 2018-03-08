import * as AWS from 'aws-sdk';
import { Video } from './../models/Video';
import { RoleType } from './../models/Role';

export class VideoController {
  public static async generateVideoUrl(req, res) {
    if(req.jwt.role = "ADMIN") {
      let s3 = new AWS.S3();
      s3.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      })
      let videoId = await Video.createEmptyVideo()
      let params = {
        ACL: "public-read",
        Bucket: process.env.S3_BUCKET_NAME,
        ContentType: 'video/mp4',
        Expires: 100,
        Key: req.jwt.username+"/"+videoId+".mp4",
      }
      return s3.getSignedUrl('putObject', params, function (err, url) {
        if(!err) {
          res.status(200);
          res.json({
            url: url,
            reference: `${process.env.S3_BUCKET_NAME}/${req.jwt.username}/${videoId}.mp4`,
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
}
