import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { Repository } from 'typeorm';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { ResponseController } from './../../controllers/response.controller';
import { ResponseService } from './../../services/response.service';
import { UserService } from './../../services/user.service';
import { VideoService } from './../../services/video.service';
import { ProgramService } from './../../services/program.service';
import { Response } from './../../models/Response';
import { User } from './../../models/User';
import { Video } from './../../models/Video';
import { Program } from './../../models/Program';
import { RoleType } from './../../models/Role';

describe.only("ResponseController", function() {
  let responseController: ResponseController;
  let responseService: ResponseService;
  let userService: UserService;
  let videoService: VideoService;
  let programService: ProgramService;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    responseService = td.object<ResponseService>(new ResponseService);
    userService = td.object<UserService>(new UserService);
    videoService = td.object<VideoService>(new VideoService);
    programService = td.object<ProgramService>(new ProgramService);
    responseController = new ResponseController({
      responseService: responseService,
      userService: userService,
      videoService: videoService,
      programService: programService
    });
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    responseService = undefined;
    userService = undefined;
    videoService = undefined;
    responseService = undefined;
    responseController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return a response controller", function() {
      expect(responseController).to.exist;
    });
    it("should inject a ResponseService dependency", function() {
      expect(responseController).to.have.own.property('responseService').that.is.equal(responseService);
    });
  });

  describe("beginResponseProcess method", async function() {
    let resultResponse: Response;
    let resultSubject: User;
    let resultVideo: Video;
    let resultProgram: Program;

    beforeEach(function() {
      req.jwt = {
        id: "abcde",
        role: RoleType.Client
      };
      req.body = {
        videoId: "video123",
        programId: "program123"
      };
      resultSubject = td.object<User>(new User);
      resultSubject.id = "subject123";
      resultVideo = td.object<Video>(new Video);
      resultProgram = td.object<Program>(new Program);
      resultResponse = td.object<Response>(new Response);
      resultResponse.id = "response123";
      resultResponse.subject = resultSubject;

      responseService.repo = td.object<Repository<Response>>(new Repository<Response>());
      userService.repo = td.object<Repository<User>>(new Repository<User>());
      videoService.repo = td.object<Repository<Video>>(new Repository<Video>());
      programService.repo = td.object<Repository<Program>>(new Repository<Program>());

      td.when(userService.repo.findOneById(req.jwt.id))
        .thenResolve(resultSubject);
      td.when(videoService.repo.findOneById(req.body.videoId))
        .thenResolve(resultVideo);
      td.when(programService.repo.findOneById(req.body.programId))
        .thenResolve(resultProgram);
      td.when(responseService.saveNewAsync(td.matchers.anything()))
        .thenResolve(resultResponse);
      td.when(responseService.generateAudioUrlAsync(resultResponse, td.matchers.anything()))
        .thenDo(async () => {
          resultResponse.gs_path = "www.audio.com";
          return "www.signedurl.com"
        });
    });

    it("should return 401 status if jwt is missing", async function() {
      req.jwt = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if jwt is missing id", async function() {
      req.jwt.id = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if jwt is missing role", async function() {
      req.jwt.role = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if body is missing", async function() {
      req.body = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if body is missing videoId", async function() {
      req.body.videoId = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if body is missing programId", async function() {
      req.body.programId = undefined;
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 401 status if role is not 'CLIENT'", async function() {
      req.jwt.role = "asdfg";
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 200 status if response is initialized properly", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return the new response's id on success", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.json().response.id).to.equal("response123");
    });

    it("should return the new response's audioUrl on success", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.json().response.audioUrl).to.equal("www.audio.com");
    });

    it("should return the signed S3 bucket url on success", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.json().aws.signedUrl).to.equal("www.signedurl.com");
    });

    it("should return the aws header params on success", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.json().aws.acl).to.exist;
      expect(res.json().aws.bucket).to.exist;
      expect(res.json().aws.key).to.exist;
      expect(res.json().aws.contentType).to.exist;
    });

    it("should return 500 status if an error is thrown", async function() {
      td.when(responseService.saveNewAsync(td.matchers.anything()))
        .thenThrow(new Error("test error"));
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });
});
