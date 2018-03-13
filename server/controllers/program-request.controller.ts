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

  public async makeProgramRequest(req, res) {
    try {
      if (!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
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
      if (!req.jwt.role || !req.jwt.id) {
        res.status(400);
        res.json({
          message: "Malformed authentication token"
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
        let details = req.body.nameArray.pop().toString();
        let skillIds = req.body.nameArray.map(function(id) {
          return parseInt(id);
        });
        let result = await this.programRequestService.saveNewAsync({
          client: await this.userService.findByIdAsync(req.jwt.id),
          text: details,
          softSkills: skillIds
        });
        if (result) {
          res.status(200);
          res.json({
            message: "Program request saved",
            result: result.id
          });
          return;
        } else {
          res.status(500);
          res.json({
            message: "Program could not be saved"
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
