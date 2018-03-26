import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { SoftSkillController } from './../../controllers/soft-skill.controller';
import { SoftSkillService } from './../../services/soft-skill.service';

describe("SoftSkillController", function() {
  let softSkillService: SoftSkillService;
  let softSkillController: SoftSkillController;
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    softSkillService = td.object<SoftSkillService>(new SoftSkillService);
    softSkillController = new SoftSkillController({
      softSkillService: softSkillService
    });
    req = new MockReq();
    res = new MockRes();
  });

  afterEach(function() {
    td.reset();
    softSkillService = undefined;
    softSkillController = undefined;
    req = undefined;
    res = undefined;
  });

  describe("constructor", function() {
    it("should return a soft skill controller", function() {
      expect(softSkillController).to.exist;
    });

    it("should have a softSkillService injected through the constructor", function() {
      expect(softSkillController).to.have.own.property('softSkillService').that.is.not.null;
      expect(softSkillController).to.have.own.property('softSkillService').that.is.equal(softSkillService);
    });
  });
});
