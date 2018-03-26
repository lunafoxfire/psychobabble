import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { ProgramController } from './../../controllers/program.controller';
import { ProgramService } from './../../services/program.service';
import { ProgramRequestService } from './../../services/program-request.service';
import { UserService } from './../../services/user.service';

describe("ProgramController", function() {
  let programService: ProgramService;
  let requestService: ProgramRequestService;
  let userService: UserService;
  let programController: ProgramController;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    programService = td.object<ProgramService>(new ProgramService);
    requestService = td.object<ProgramRequestService>(new ProgramRequestService);
    userService = td.object<UserService>(new UserService);
    programController = new ProgramController({
      programService: programService,
      programRequestService: requestService,
      userService: userService
    });
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    programService = undefined;
    requestService = undefined;
    userService = undefined;
    programController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return a program controller", function() {
      expect(programController).to.exist;
    });

    it("should have a programService injected through the constructor", function() {
      expect(programController).to.have.own.property('programService').that.is.not.null;
      expect(programController).to.have.own.property('programService').that.is.equal(programService);
    });

    it("should have a programRequestService injected through the constructor", function() {
      expect(programController).to.have.own.property('programRequestService').that.is.not.null;
      expect(programController).to.have.own.property('programRequestService').that.is.equal(requestService);
    });

    it("should have a userService injected through the constructor", function() {
      expect(programController).to.have.own.property('userService').that.is.not.null;
      expect(programController).to.have.own.property('userService').that.is.equal(userService);
    });
  });

  describe("makeProgram method", function() {
    it("should return 401 status if jwt is missing");

    it("should return 400 status if jwt is missing id");

    it("should return 400 status if jwt is missing role");

    it("should return 400 status if body is missing");

    it("should return 400 status if body is missing program");

    it("should return 400 status if body is missing program.author");

    it("should return 400 status if body is missing program.client");

    it("should return 400 status if body is missing program.requestId");
  });
});
