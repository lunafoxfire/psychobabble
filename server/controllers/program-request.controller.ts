import { fixThis } from './../utility/fix-this';
import { SoftSkillService } from './../services/soft-skill.service';

export class ProgramRequestController {
  private softSkillService: SoftSkillService;

  constructor(softSkillService: SoftSkillService = null) {
    this.softSkillService = softSkillService || new SoftSkillService();
    fixThis(this, ProgramRequestController);
  }

  public async getAllSoftSkills(req, res) {
    console.log("%%%%%%%%%%%%%%%%%%");
    let skills = await this.softSkillService.getAllSkills().catch((err) => {
      console.log(err);
    });
    console.log(skills);
    if(skills) {
      res.status(200);
      res.json({
        thing: skills
      })
    } else {
      res.status(400);
      res.json({
        message: "something went wrong"
      })
    }
  }
}
