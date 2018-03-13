import { fixThis } from './../utility/fix-this';
import { ProgramService } from './../services/program.service';

export class ProgramController {
  private programService: ProgramService;

  constructor(programService: ProgramService = null) {
    this.programService = programService || new ProgramService();

    fixThis(this, ProgramController);
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
