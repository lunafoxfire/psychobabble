import { Repository, getRepository } from 'typeorm';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';

export class SoftSkillService {
  private softSkillRepo: Repository<SoftSkill>;

  constructor(softSkillRepo: Repository<SoftSkill> = null) {
    this.softSkillRepo = softSkillRepo || getRepository(SoftSkill);
  }

  /** Saves all soft skills in the SoftSkillNames enum to the database. */
  public async syncSoftSkillsToDbAsync() {
    let skillList = Object.values(SoftSkillType);
    await Promise.all(skillList.map(async (skillName) => {
      let skillFinder = await this.softSkillRepo.findOne({name: skillName});
      if (!skillFinder) {
        let newSoftSkill = new SoftSkill();
        newSoftSkill.name = skillName;
        await this.softSkillRepo.save(newSoftSkill);
      }
      return;
    }));
  }

  /** Retrieves a soft skill from the database by its SoftSkillType */
  public async findByNameAsync(skillName: SoftSkillType): Promise<SoftSkill> {
    return this.softSkillRepo.findOne({name: skillName});
  }
}
