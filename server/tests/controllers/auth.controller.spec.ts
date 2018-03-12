import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { AuthController } from './../../controllers/auth.controller';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/User';

describe("AuthController", function() {
  let authService: AuthService;
  let authController: AuthController;
  let resultUser: User;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    authService = td.object<AuthService>(new AuthService);
    authController = new AuthController(authService);
    resultUser = td.object<User>(new User);
    req = new MockReq();
    res = new MockRes();

    td.when(authService.registerClientAsync(
      td.matchers.isA(String),
      td.matchers.isA(String),
      td.matchers.isA(String)
    )).thenResolve(resultUser);

    td.when(resultUser.generateJwt()).thenReturn("fake token string");
  });

  afterEach(function() {
    td.reset();
    authService = undefined;
    authController = undefined;
    resultUser = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return an auth controller", function() {
      expect(authController).to.exist;
    });
    it("should have an authService", function() {
      expect(authController).to.have.own.property('authService').that.is.not.null;
    });
    it("should inject the passed in authService", function() {
      expect(authController).to.have.own.property('authService').that.is.equal(authService);
    });
  });

  describe("registerClient method", function() {
    it("should return 400 if body is missing", function() {
      req.body = undefined;
      authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if username is missing", function() {
      req.body = {
        // username: "Test Name",
        email: "test@test.com",
        password: "password1"
      };
      authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if email is missing", function() {
      req.body = {
        username: "Test Name",
        // email: "test@test.com",
        password: "password1"
      };
      authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if password is missing", function() {
      req.body = {
        username: "Test Name",
        email: "test@test.com",
        // password: "password1"
      };
      authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    // TODO: Write these tests and implement the checks
    it("should return 400 if username is malformed");
    it("should return 400 if email is malformed");
    it("should return 400 if password is malformed");

    it("should return 200 if user is registered", async function() {
      req.body = {
        username: "Test Name",
        email: "test@test.com",
        password: "password1"
      };
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return a response with a 'token' property", async function() {
      req.body = {
        username: "Test Name",
        email: "test@test.com",
        password: "password1"
      };
      await authController.registerClient(req, res);
      expect(res.json().token).to.exist;
    });

    it("should return status 422 if registration function returns null", async function() {
      req.body = {
        username: "Taken Name",
        email: "existing-email@test.com",
        password: "password1"
      };
      td.when(authService.registerClientAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(null);
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(422);
      expect(res.json().message).to.exist;
    });

    it("should return status 500 if an exception is thrown", async function() {
      req.body = {
        username: "Test Name",
        email: "existing-email@test.com",
        password: "password1"
      };
      td.when(authService.registerClientAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenReject(new Error("Test error"));
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });
});
