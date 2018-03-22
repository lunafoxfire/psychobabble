import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
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

describe("ResponseController", function() {
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
    it("should inject a responseService dependency", function() {
      expect(responseController).to.have.own.property('responseService').that.is.equal(responseService);
    });
    it("should inject a userService dependency", function() {
      expect(responseController).to.have.own.property('userService').that.is.equal(userService);
    });
    it("should inject a videoService dependency", function() {
      expect(responseController).to.have.own.property('videoService').that.is.equal(videoService);
    });
    it("should inject a programService dependency", function() {
      expect(responseController).to.have.own.property('programService').that.is.equal(programService);
    });
  });

  describe("beginResponseProcess method", async function() {
    let resultResponse: Response;
    let resultSubject: User;
    let resultVideo: Video;
    let resultProgram: Program;

    beforeEach(function() {
      req.jwt = {
        id: "test-user-id",
        role: RoleType.Subject
      };
      req.body = {
        videoId: "test-video-id",
        programId: "test-program-id"
      };

      resultSubject = td.object<User>(new User);
      td.when(userService.repo.findOneById(req.jwt.id))
        .thenResolve(resultSubject);

      resultVideo = td.object<Video>(new Video);
      td.when(videoService.repo.findOneById(req.body.videoId))
        .thenResolve(resultVideo);

      resultProgram = td.object<Program>(new Program);
      td.when(programService.repo.findOneById(req.body.programId))
        .thenResolve(resultProgram);

      resultResponse = td.object<Response>(new Response);
      resultResponse.id = "test-response-id";
      resultResponse.subject = resultSubject;
      td.when(responseService.saveNewAsync(td.matchers.anything()))
        .thenResolve(resultResponse);
    });

    afterEach(function() {
      resultResponse = undefined;
      resultSubject = undefined;
      resultVideo = undefined;
      resultProgram = undefined;
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

    it("should return 401 status if role is not 'SUBJECT'", async function() {
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
      expect(res.json().responseId).to.equal("test-response-id");
    });

    it("should return 500 status if an error is thrown", async function() {
      td.when(responseService.saveNewAsync(td.matchers.anything()))
        .thenThrow(new Error("test error"));
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });

    it("should return 500 status if subject cannot be found", async function() {
      td.when(userService.repo.findOneById(td.matchers.anything()))
        .thenResolve(undefined);
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });

    it("should return 500 status if video cannot be found", async function() {
      td.when(videoService.repo.findOneById(td.matchers.anything()))
        .thenResolve(undefined);
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });

    it("should return 500 status if program cannot be found", async function() {
      td.when(programService.repo.findOneById(td.matchers.anything()))
        .thenResolve(undefined);
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });

    it("should return 500 status if response cannot be created", async function() {
      td.when(responseService.saveNewAsync(td.matchers.anything()))
        .thenResolve(undefined);
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("generateAudioUrl method", async function() {
    let resultResponse: Response;
    let resultSignedUrl: string;

    beforeEach(function() {
      req.jwt = {
        role: RoleType.Subject
      };
      req.query = {
        responseId: "test-response-id",
      };

      resultResponse = td.object<Response>(new Response);
      td.when(responseService.repo.findOneById(td.matchers.anything(), td.matchers.anything()))
        .thenResolve(resultResponse);
      td.when(responseService.generateAudioUrlAsync(td.matchers.anything()))
        .thenResolve("www.signed-url.net");
    });

    afterEach(function() {
      resultResponse = undefined;
      resultSignedUrl = undefined;
    });

    it("should return 401 status if jwt is missing", async function() {
      req.jwt = undefined;
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if jwt is missing role", async function() {
      req.jwt.role = undefined;
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if query params are missing", async function() {
      req.query = undefined;
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 status if query params are missing responseId", async function() {
      req.query.responseId = undefined;
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 401 status if role is not 'SUBJECT'", async function() {
      req.jwt.role = "asdfg";
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 200 status if response is initialized properly", async function() {
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return the signed url on success", async function() {
      await responseController.generateAudioUrl(req, res);
      expect(res.json().signedUrl).to.equal("www.signed-url.net");
    });

    it("should return 500 status if an error is thrown", async function() {
      td.when(responseService.repo.findOneById(td.matchers.anything(), td.matchers.anything()))
        .thenThrow(new Error("test error"));
      await responseController.generateAudioUrl(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });
});
