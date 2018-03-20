import { Repository, getRepository } from 'typeorm';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';

export class SoftSkillService {
  private softSkillRepo: Repository<SoftSkill>;
  public repo: Repository<SoftSkill>;

  constructor(softSkillRepo: Repository<SoftSkill> = null) {
    this.softSkillRepo = softSkillRepo || getRepository(SoftSkill);
    this.repo = this.softSkillRepo;
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

  public async getAllSkills() {
    return await this.softSkillRepo.find();
  }

  /** Retrieves a soft skill from the database by its SoftSkillType */
  public async findByNameAsync(skillName: string): Promise<SoftSkill> {
    return this.softSkillRepo.findOne({name: skillName});
  }
  public async findByIdAsync(skillId: number): Promise<SoftSkill> {
    return this.softSkillRepo.findOne({id: skillId});
  }
}
