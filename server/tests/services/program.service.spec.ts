import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { Repository } from 'typeorm';
import { Program } from './../../models/Program';
import { ProgramService } from './../../services/program.service';

describe("Program Service", function() {
  let programService: ProgramService;
  let programRepo: Repository<Program>;

  beforeEach(function() {
    programRepo = td.object<Repository<Program>>(new Repository<Program>());
    programService = new ProgramService(programRepo);
  });

  afterEach(function() {
    td.reset();
    programService = undefined;
    programRepo = undefined;
  });

  describe("constructor", function() {
    it("should return a program service", function() {
      expect(programService).to.exist;
    });
    it("should have a programRepo", function() {
      expect(programService).to.have.own.property('programRepo').that.is.not.null;
    });
    it("should inject the passed in programRepo", function() {
      expect(programService).to.have.own.property('programRepo').that.is.equal(programRepo);
    });
  })
});
