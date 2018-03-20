import { fixThis } from './../utility/fix-this';
import { ProgramService } from './../services/program.service';
import { ProgramRequestService } from './../services/program-request.service';
import { UserService } from './../services/user.service';

export class ProgramController {
  private programService: ProgramService;
  private programRequestService: ProgramRequestService;
  private userService: UserService;

  constructor(programService: ProgramService = null, programRequestService: ProgramRequestService = null, userService: UserService = null) {
    this.programService = programService || new ProgramService();
    this.programRequestService = programRequestService || new ProgramRequestService();
    this.userService = userService || new UserService();
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
        console.log(req.jwt.id);//TODO: Check if user exists and if that user is an admin instead, otherwise no error is thrown when database resets on seed.
        req.body.program.author = await this.userService.findByIdAsync(req.jwt.id);
        req.body.program.client = await this.userService.findByUsernameAsync(req.body.program.client);
        let program = await this.programService.saveNewAsync(req.body.program);
        let request = await this.programRequestService.fulfillRequest(req.body.requestId);
        if(program && request) {
          res.status(200);
          res.json({
            program: program,
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
        let programs = await this.programService.getPrograms(req.query.page, req.query.resultCount, req.query.searchTerm);
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

  public async getProgramDetails(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "CLIENT") {
        req.body.client = await this.userService.findByIdAsync(req.jwt.id);
        let program = await this.programService.getDetails(req.params.programId, req.body.client);
        if(program) {
          res.status(200);
          res.json({
            program: program,
            message: "Grabbed program details"
          })
        } else {
          res.status(401);
          res.json({
            message: "Not Authorized or Program Not Found"
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

  public async getProgramDetailsAdmin(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let client = await this.userService.findByIdAsync(req.params.clientId)
        let program = await this.programService.getDetails(req.params.programId, client);
        if(program) {
          res.status(200);
          res.json({
            program: program,
            message: "Grabbed program details"
          })
        } else {
          res.status(401);
          res.json({
            message: "Not Authorized or Program Not Found"
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

  public async getClientPrograms(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "CLIENT") {
        let programs = await this.programService.getClientPrograms(req.params.clientId);
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

  public async getCurrentVideo(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "SUBJECT") {
        let subject = await this.userService.findByIdAsync(req.jwt.id);
        let video = await this.programService.getCurrentVideo(req.params.programId, subject);
        if(video) {
          res.status(200);
          res.json({
            video: video,
            message: "Grabbed all the things"
          })
          return;
        } else {
          res.status(500);
          res.json({
            message: "All Videos Watched"
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
