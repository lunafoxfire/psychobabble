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
});
