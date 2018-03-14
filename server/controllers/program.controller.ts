import { fixThis } from './../utility/fix-this';
import { ProgramService } from './../services/program.service';
import { ProgramRequestService } from './../services/program-request.service';

export class ProgramController {
  private programService: ProgramService;
  private programRequestService: ProgramRequestService;

  constructor(programService: ProgramService = null, programRequestService: ProgramRequestService = null) {
    this.programService = programService || new ProgramService();
    this.programRequestService = programRequestService || new ProgramRequestService();

    fixThis(this, ProgramController);
  }

  public async makeProgram(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        req.body.program.author = req.jwt.username;
        console.log(req.body);
        let programs = await this.programService.saveNewAsync(req.body.program);
        let request = await this.programRequestService.fulfillRequest(req.body.requestId);
        if(programs && request) {
          res.status(200);
          res.json({
            programs: programs,
            message: "saved all the things"
          })
        } else {
          res.status(500);
          res.json({
            message: "Unknown error"
          });
          return;
        }
      } else {
        res.status(401);
        res.json({
          message: "Not Authorized"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getAllPrograms(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let programs = await this.programService.getPrograms(req.body.page, req.body.resultCount);
        if(programs) {
          res.status(200);
          res.json({
            programs: programs,
            message: "Grabbed all the things"
          })
        } else {
          res.status(500);
          res.json({
            message: "Unknown error"
          });
          return;
        }
      } else {
        res.status(401);
        res.json({
          message: "Not Authorized"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }
}
