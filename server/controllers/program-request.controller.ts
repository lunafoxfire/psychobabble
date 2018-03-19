import { fixThis } from './../utility/fix-this';
import { SoftSkillService } from './../services/soft-skill.service';
import { ProgramRequestService, NewProgramRequestOptions } from './../services/program-request.service';
import { UserService } from './../services/user.service';

export interface ProgramRequestControllerDependencies {
  softSkillService: SoftSkillService;
  programRequestService: ProgramRequestService;
  userService: UserService;
}

export class ProgramRequestController {
  private softSkillService: SoftSkillService;
  private programRequestService: ProgramRequestService;
  private userService: UserService;

  constructor(dependencies: ProgramRequestControllerDependencies = null) {
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
    this.programRequestService = dependencies ? dependencies.programRequestService : new ProgramRequestService();
    this.userService = dependencies ? dependencies.userService : new UserService();
    fixThis(this, ProgramRequestController);
  }

  public async getAllRequests(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let requests = await this.programRequestService.getRequests(req.body.page, req.body.resultCount);
        if(requests) {
          res.status(200);
          res.json({
            requests: requests,
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

  public async getPendingClientRequests(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "CLIENT") {
        let client = await this.userService.findByIdAsync(req.jwt.id)
        let requests = await this.programRequestService.getPendingClientRequests(req.body.page, req.body.resultCount, client);
        if(requests) {
          res.status(200);
          res.json({
            requests: requests,
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

  public async getRequestDetails(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let request = await this.programRequestService.getRequestDetails(req.params.requestId);
        if(request) {
          res.status(200);
          res.json({
            request: request,
            message: "Grabbed all the things"
          })
          return;
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

  public async getClientRequestDetails(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "CLIENT") {
        let request = await this.programRequestService.getRequestDetails(req.params.requestId);
        if(request) {
          res.status(200);
          res.json({
            request: request,
            message: "Grabbed all the things"
          })
          return;
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

  public async getClientRequestDetailsAdmin(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let request = await this.programRequestService.getRequestDetails(req.params.requestId);
        if(request) {
          res.status(200);
          res.json({
            request: request,
            message: "Grabbed all the things"
          })
          return;
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

  public async makeProgramRequest(req, res) {
    try {
      if (!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing Token"
        });
        return;
      }
      if (!req.jwt.role || !req.jwt.id) {
        res.status(400);
        res.json({
          message: "Malformed authentication token"
        });
        return;
      }
      if (!req.body) {
        res.status(400);
        res.json({
          message: "Missing request body"
        });
        return;
      }
      if (!req.body.nameArray) {
        res.status(400);
        res.json({
          message: "nameArray parameter is missing"
        });
        return;
      }
      if(req.jwt.role !== "CLIENT") {
        res.status(401);
        res.json({
          message: "Unauthorized"
        });
        return;
      } else {
        let expiration = new Date(req.body.expiration).getTime();
        let skillIds = req.body.nameArray.map(function(id) {
          return parseInt(id);
        });
        let result = await this.programRequestService.saveNewAsync({
          client: await this.userService.findByIdAsync(req.jwt.id),
          expiration: expiration,
          text: req.body.details,
          softSkills: skillIds,
          jobTitle: req.body.jobTitle,
        });
        if(result) {
          res.status(200);
          res.json({
            message: "Success!"
          });
          return;
        } else {
          res.status(500);
          res.json({
            message: "Fail!"
          });
          return;
        }
      }
    }
    catch (err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
    }
  }

  public async getAllSoftSkills(req, res) {
    try {
      let skills = await this.softSkillService.getAllSkills();
      if(skills && skills.length > 0) {
        res.status(200);
        res.json({
          message: "Query successful",
          skillArray: skills
        });
        return;
      } else {
        res.status(204);
        res.json({
          message: "Database table is empty..."
        });
      }
    }
    catch (err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
    }
  }
}
