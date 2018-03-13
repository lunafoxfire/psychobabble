import { fixThis } from './../utility/fix-this';
import { SoftSkillService } from './../services/soft-skill.service';
import { ProgramRequestService, NewProgramRequestOptions } from './../services/program-request.service';
import { UserService } from './../services/user.service';

export class ProgramRequestController {
  private softSkillService: SoftSkillService;
  private programRequestService: ProgramRequestService;
  private userService: UserService;

  constructor(softSkillService: SoftSkillService = null, programRequestService: ProgramRequestService = null, userService: UserService = null) {
    this.softSkillService = softSkillService || new SoftSkillService();
    this.programRequestService = programRequestService || new ProgramRequestService();
    this.userService = userService || new UserService();

    fixThis(this, ProgramRequestController);
  }

  public async makeProgramRequest(req, res) {
    if(req.jwt.role === "CLIENT") {
      console.log(req.body.nameArray);
      let result = await this.programRequestService.saveNewAsync({
        client: await this.userService.findByIdAsync(req.jwt.id),
        text: "Change Me",
        softSkills: req.body.nameArray
      });
      if(result) {
        res.status(200);
        res.json({
          result: result.id
        });
      } else {
        res.status(500);
        res.json({
          result: "SOMETHING WENT WRONG AAAAAAAAAAHHHHHHHHHHHH"
        })
      }
    }
  }

  public async getAllSoftSkills(req, res) {
    let skills = await this.softSkillService.getAllSkills().catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        message: "something went wrong"
      })
    });
    if(skills) {
      res.status(200);
      res.json({
        skillArray: skills
      })
    } else {
      res.status(400);
      res.json({
        message: "something went wrong"
      })
    }
  }
}
