import { fixThis } from './../utility/fix-this';
import { reqRequire, requireRole, exceptionResult } from './../utility/req-require';
import * as AWS from 'aws-sdk';
import { Video } from './../models/Video';
import { VideoService } from './../services/video.service';
import { RoleType } from './../models/Role';

export interface VideoControllerDependencies {
  videoService: VideoService;
}

export class VideoController {
  private videoService: VideoService;

  constructor(dependencies: VideoControllerDependencies = null) {
    this.videoService = dependencies ? dependencies.videoService : new VideoService();
    fixThis(this, VideoController);
  }

  public async getVideos(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
        ['role', 400, "Malformed auth token"]],
        ['query', 400, "Request query params missing",
        ['page', 400, "Missing 'page' in query params"],
        ['resultCount', 400, "Missing 'resultCount' in query params"],
        ['searchTerm', 400, "Missing 'searchTerm' in query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let videos = await this.videoService.getAllVideos(req.query.page, req.query.resultCount, req.query.searchTerm).catch((err) => {
        console.log(err);
        res.status(500);
        res.json({
          message: "something went wrong"
        })
      });
      if(videos) {
        res.status(200);
        res.json({
          videos: videos
        })
      } else {
        res.status(500);
        res.json({
          message: "something went wrong"
        })
      }
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async generateVideoUrl(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
        ['role', 400, "Malformed auth token"],
        ['username', 400, "Malformed auth token"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let s3 = new AWS.S3();
      s3.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      })
      let videoId = await this.videoService.createEmptyVideo()
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
          res.status(500);
          res.json({
            message: "Something went wrong"
          })
        }
      });
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async uploadVideo(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
        ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request query params missing",
        ['videoId', 400, "Missing 'videoId' in body"],
        ['url', 400, "Missing 'url' in body"],
        ['description', 400, "Missing 'description' in body"],
        ['title', 400, "Missing 'title' in body"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let result = await this.videoService.uploadAsync({
        id: req.body.videoId,
        url: req.body.url,
        description: req.body.description, // TODO: Soft Skills
        title: req.body.title
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
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async removeVideo(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
        ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request body missing",
        ['videoId', 400, "Missing 'videoId' in body"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let deleted = await this.videoService.deleteVideoId(req.body.videoId).then((bool) => {
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
    }
    catch (err) { exceptionResult(err, res); }
  }
}
