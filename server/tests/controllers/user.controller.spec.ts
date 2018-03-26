import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { UserController } from './../../controllers/user.controller';
import { UserService } from './../../services/user.service';

describe("SoftSkillController", function() {
  let userService: UserService;
  let userController: UserController;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    userService = td.object<UserService>(new UserService);
    userController = new UserController({
      userService: userService
    });
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    userService = undefined;
    userController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return a user controller", function() {
      expect(userController).to.exist;
    });

    it("should have a userService injected through the constructor", function() {
      expect(userController).to.have.own.property('userService').that.is.not.null;
      expect(userController).to.have.own.property('userService').that.is.equal(userService);
    });
  });

  describe("getClients method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if query params are missing");

    it("should return 400 status if query params are missing page");

    it("should return 400 status if query params are missing resultCount");

    it("should return 400 status if query params are missing searchTerm");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return the clients on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("getProgramSubjects method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if route params are missing");

    it("should return 400 status if route params are missing programId");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return the subjects on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("getTopSubjects method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if route params are missing");

    it("should return 400 status if route params are missing programId");

    it("should return 401 status if role is not 'ADMIN' or 'CLIENT'");

    it("should return 200 status on success");

    it("should return the subjects on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("getClientDetails method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if route params are missing");

    it("should return 400 status if route params are missing clientId");

    it("should return 400 status if query params are missing");

    it("should return 400 status if query params are missing requestSearchTerm");

    it("should return 400 status if query params are missing requestpage");

    it("should return 400 status if query params are missing requestResultCount");

    it("should return 400 status if query params are missing programSearchTerm");

    it("should return 400 status if query params are missing programPage");

    it("should return 400 status if query params are missing programResultCount");

    it("should return 401 status if role is not 'ADMIN'");

    it("should return 200 status on success");

    it("should return the client on success");

    it("should return 500 status if an exception is thrown");
  });

  describe("getProfile method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing id");

    it("should return 400 status if jwt is missing role");

    it("should return 200 status on success");

    it("should return the user on success");

    it("should return 500 status if an exception is thrown");
  });
});
