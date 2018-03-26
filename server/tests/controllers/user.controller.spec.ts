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
});
