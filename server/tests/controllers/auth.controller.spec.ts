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
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    authService = td.object<AuthService>(new AuthService);
    authController = new AuthController(authService);
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    authService = undefined;
    authController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return an auth controller", function() {
      expect(authController).to.exist;
    });
    it("should inject the passed in authService", function() {
      expect(authController).to.have.own.property('authService').that.is.equal(authService);
    });
  });

  describe("registerClient method", function() {
    let resultUser: User;

    beforeEach(function() {
      req.body = {
        username: "Test Name",
        email: "test@test.com",
        password: "password1"
      }
      resultUser = td.object<User>(new User);
      td.when(authService.registerClientAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(resultUser);
      td.when(resultUser.generateJwt()).thenReturn("fake token string");
    });

    afterEach(function() {
      resultUser = undefined;
    });

    it("should return 400 if body is missing", async function() {
      req.body = undefined;
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if username is missing", async function() {
      req.body.username = undefined;
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if email is missing", async function() {
      req.body.email = undefined;
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if password is missing", async function() {
      req.body.password = undefined;
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    // TODO: Write these tests and implement the checks
    it("should return 400 if username is malformed");
    it("should return 400 if email is malformed");
    it("should return 400 if password is malformed");

    it("should return 200 if user is registered", async function() {
      await authController.registerClient(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return a response with a 'token' property", async function() {
      await authController.registerClient(req, res);
      expect(res.json().token).to.exist;
    });

    it("should return status 422 if registration function returns null", async function() {
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

  describe("registerSubject method", function() {
    let resultUser: User;

    beforeEach(function() {
      req.body = {
        username: "Test Name",
        email: "test@test.com",
        password: "password1"
      }
      resultUser = td.object<User>(new User);
      td.when(authService.registerSubjectAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(resultUser);
      td.when(resultUser.generateJwt()).thenReturn("fake token string");
    });

    afterEach(function() {
      resultUser = undefined;
    });

    it("should return 400 if body is missing", async function() {
      req.body = undefined;
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if username is missing", async function() {
      req.body.username = undefined;
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if email is missing", async function() {
      req.body.email = undefined;
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if password is missing", async function() {
      req.body.password = undefined;
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    // TODO: Write these tests and implement the checks
    it("should return 400 if username is malformed");
    it("should return 400 if email is malformed");
    it("should return 400 if password is malformed");

    it("should return 200 if user is registered", async function() {
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return a response with a 'token' property", async function() {
      await authController.registerSubject(req, res);
      expect(res.json().token).to.exist;
    });

    it("should return status 422 if registration function returns null", async function() {
      td.when(authService.registerSubjectAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(null);
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(422);
      expect(res.json().message).to.exist;
    });

    it("should return status 500 if an exception is thrown", async function() {
      td.when(authService.registerSubjectAsync(
        td.matchers.isA(String),
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenReject(new Error("Test error"));
      await authController.registerSubject(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("loginLocal method", function() {
    beforeEach(function() {
      req.body = {
        loginName: "Test user",
        password: "password1"
      };
    });

    it("should return status 400 when body is missing", async function() {
      req.body = undefined;
      await authController.loginLocal(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return status 400 when loginName is missing", async function() {
      req.body.loginName = undefined;
      await authController.loginLocal(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return status 400 when password is missing", async function() {
      req.body.password = undefined;
      await authController.loginLocal(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    // TODO: Find how to unit test by mocking passport
    it("should return status 200 when login is successful");
    it("should return status 401 when login fails");
  });

  describe("sendResetEmail method", function() {
    beforeEach(function() {
      req.body = {
        email: "test@test.com"
      };
      req.headers = {
        host: "www.test.com"
      };
    });

    it("should return 400 if body is missing", async function() {
      req.body = undefined;
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if headers are missing", async function() {
      req.headers = undefined;
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if email is missing", async function() {
      req.body.email = undefined;
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if host header is missing", async function() {
      req.headers.host = undefined;
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return status 200 if email sends successfully", async function() {
      td.when(authService.sendPassResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenResolve(true);
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return status 422 if email fails to send", async function() {
      td.when(authService.sendPassResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenResolve(false);
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(422);
      expect(res.json().message).to.exist;
    });

    it("should return status 500 if an exception is thrown", async function() {
      td.when(authService.sendPassResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenReject(new Error("test error"));
      await authController.sendResetEmail(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("resendResetEmail method", function() {
    beforeEach(function() {
      req.body = {
        userId: "abcde"
      };
      req.headers = {
        host: "www.test.com"
      };
    });

    it("should return 400 if body is missing", async function() {
      req.body = undefined;
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if headers are missing", async function() {
      req.headers = undefined;
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if userId is missing", async function() {
      req.body.userId = undefined;
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if host header is missing", async function() {
      req.headers.host = undefined;
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return status 200 if email sends successfully", async function() {
      td.when(authService.resendPasswordResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenResolve(true);
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return status 422 if email fails to send", async function() {
      td.when(authService.resendPasswordResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenResolve(false);
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(422);
      expect(res.json().message).to.exist;
    });

    it("should return status 500 if an exception is thrown", async function() {
      td.when(authService.resendPasswordResetEmail(
        td.matchers.anything(),
        td.matchers.anything()
      )).thenReject(new Error("test error"));
      await authController.resendResetEmail(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("passChange method", function() {
    beforeEach(function() {
      req.body = {
        newPass: "password2",
        userId: "abcde",
        token: "TESTTOKEN123"
      };
    });

    it("should return status 400 if body is missing", async function() {
      req.body = undefined;
      await authController.passChange(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if newPass parameter is missing", async function() {
      req.body.newPass = undefined;
      await authController.passChange(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if userId parameter is missing", async function() {
      req.body.userId = undefined;
      await authController.passChange(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if token parameter is missing", async function() {
      req.body.token = undefined;
      await authController.passChange(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return status 401 if token is expired or incorrect", async function() {
      td.when(authService.changePassword(req.body.newPass, req.body.userId, req.body.token))
        .thenResolve(0);
      await authController.passChange(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return status 422 if the new password is the same as their old one", async function() {
      td.when(authService.changePassword(req.body.newPass, req.body.userId, req.body.token))
        .thenResolve(1);
      await authController.passChange(req, res);
      expect(res.status()).to.equal(422);
      expect(res.json().message).to.exist;
    });

    it("should return status 200 if password is successfully changed", async function() {
      td.when(authService.changePassword(req.body.newPass, req.body.userId, req.body.token))
        .thenResolve(2);
      await authController.passChange(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return status 500 if an exception is thrown", async function() {
      td.when(authService.changePassword(req.body.newPass, req.body.userId, req.body.token))
        .thenReject(new Error("Test error"));
      await authController.passChange(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("verifyUser method", function() {
    let resultUser: User;

    beforeEach(function() {
      req.body = {
        code: "12345"
      }
      req.jwt = {
        id: "abcde"
      };
      resultUser = td.object<User>(new User);
      td.when(resultUser.generateJwt()).thenReturn("fake token string");
      td.when(authService.checkValidationCode(
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(resultUser);
    });

    afterEach(function() {
      resultUser = undefined;
    });

    it("should return 401 if jwt is missing", async function() {
      req.jwt = undefined;
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if jwt is missing id", async function() {
      req.jwt.id = undefined;
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if request body is missing", async function() {
      req.body = undefined;
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if code parameter is missing", async function() {
      req.body.code = undefined;
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 200 if user is successfully validated", async function() {
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return a jwt in the response body", async function() {
      await authController.verifyUser(req, res);
      expect(res.json().token).to.equal("fake token string");
    });

    it("should return 401 if validation fails", async function() {
      td.when(authService.checkValidationCode(
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenResolve(null);
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 500 if an exception is thrown", async function() {
      td.when(authService.checkValidationCode(
        td.matchers.isA(String),
        td.matchers.isA(String)
      )).thenReject(new Error("Test error"));
      await authController.verifyUser(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });

  describe("resendVerification method", function() {
    beforeEach(function() {
      req.jwt = {
        email: "test@test.com"
      };
    });

    it("should return 401 if jwt is missing", async function() {
      req.jwt = undefined;
      await authController.resendVerification(req, res);
      expect(res.status()).to.equal(401);
      expect(res.json().message).to.exist;
    });

    it("should return 400 if jwt is missing email", async function() {
      req.jwt.email = undefined;
      await authController.resendVerification(req, res);
      expect(res.status()).to.equal(400);
      expect(res.json().message).to.exist;
    });

    it("should return 200 if email sends successfully", async function() {
      await authController.resendVerification(req, res);
      expect(res.status()).to.equal(200);
      expect(res.json().message).to.exist;
    });

    it("should return 500 if an exception was thrown", async function() {
      td.when(authService.resendValidationEmail(req.jwt.email))
        .thenReject(new Error("test error"));
      await authController.resendVerification(req, res);
      expect(res.status()).to.equal(500);
      expect(res.json().message).to.exist;
    });
  });
});
