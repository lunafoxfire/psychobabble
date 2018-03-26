import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { VideoController } from './../../controllers/video.controller';
import { VideoService } from './../../services/video.service';

describe("VideoController", function() {
  let videoService: VideoService;
  let videoController: VideoController;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    videoService = td.object<VideoService>(new VideoService);
    videoController = new VideoController({
      videoService: videoService
    });
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    videoService = undefined;
    videoController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return a video controller", function() {
      expect(videoController).to.exist;
    });

    it("should have a videoService injected through the constructor", function() {
      expect(videoController).to.have.own.property('videoService').that.is.not.null;
      expect(videoController).to.have.own.property('videoService').that.is.equal(videoService);
    });
  });

  describe("getVideos method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if query params are missing");

    it("should return 400 status if query params are missing page");

    it("should return 400 status if query params are missing resultCount");

    it("should return 400 status if query params are missing searchTerm");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return the videos on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("generateVideoUrl method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if jwt is missing username");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return the information on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("uploadVideo method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if body is missing");

    it("should return 400 status if body is missing videoId");

    it("should return 400 status if body is missing url");

    it("should return 400 status if body is missing description");

    it("should return 400 status if body is missing title");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("removeVideo method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if body is missing");

    it("should return 400 status if body is missing videoId");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return 500 status if an exception is thrown");
  });
});
