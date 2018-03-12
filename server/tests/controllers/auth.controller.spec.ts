import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { AuthController } from './../../controllers/auth.controller';
import { AuthService } from './../../services/auth.service';

describe("AuthController", function() {
  let authService: AuthService;
  let authController: AuthController;
  let testReq;
  let testRes;

  beforeEach(function() {
    authService = td.object<AuthService>(new AuthService());
    authController = new AuthController(authService);
  });

  afterEach(function() {
    td.reset();
    authService = undefined;
    authController = undefined;
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
    it("should return 400 if username is missing", function() {
      let testReq: any = {
        body: {
          // username: "Test Name",
          email: "test@test.com",
          password: "password1"
        }
      };
      let testRes: any = {};

      authController.registerClient(testReq, testRes);

      expect(testRes.status).to.equal(400);
    });
  });
});
