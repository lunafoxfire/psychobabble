import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { ResponseController } from './../../controllers/response.controller';
import { ResponseService } from './../../services/response.service';
import { RoleType } from './../../models/Role';

describe("ResponseController", function() {
  let responseController: ResponseController;
  let responseService: ResponseService;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    responseService = td.object<ResponseService>(new ResponseService);
    responseController = new ResponseController(responseService);
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
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
    beforeEach(function() {
      req.jwt = {
        id: "abcde",
        role: RoleType.Client
      };
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
      req.jwt = undefined;
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
      expect(res.json().responseId).to.equal("qwerty");
    });

    it("should return the AWS S3 link to save the audio recording", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.json().audioUrl).to.equal("http://testurl.com");
    });

    it("should return 500 status if an error is thrown", async function() {
      await responseController.beginResponseProcess(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });
});
