import { fixThis } from './../utility/fix-this';
import { reqRequire, exceptionResult } from './../utility/express-utilities';
import { SoftSkillService } from './../services/soft-skill.service';

export interface SoftSkillControllerDependencies {
  softSkillService: SoftSkillService;
}

export class SoftSkillController {
  private softSkillService: SoftSkillService;

  constructor(dependencies: SoftSkillControllerDependencies = null) {
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
    fixThis(this, SoftSkillController);
  }

  public async getAll(req, res) {
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
    catch (err) { exceptionResult(err, res); }
  }
}
