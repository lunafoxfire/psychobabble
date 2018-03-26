import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { ProgramController } from './../../controllers/program.controller';
import { ProgramRequestService } from './../../services/program-request.service';
