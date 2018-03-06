import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, getRepository } from "typeorm";
import { ProgramRequest } from "./ProgramRequest";

@Entity('soft_skills')
export class SoftSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => ProgramRequest, programRequests => programRequests.softSkills)
  programRequests: ProgramRequest[];

  // Saves all skills in skill enum to db
  public static async syncSoftSkillsToDbAsync() {
    let skillRepo = getRepository(SoftSkill);
    let skillList = Object.values(SoftSkillType);
    await Promise.all(skillList.map(async (skillName) => {
      let skillFinder = await skillRepo.findOne({name: skillName});
      if (!skillFinder) {
        let newSoftSkill = new SoftSkill();
        newSoftSkill.name = skillName;
        await skillRepo.save(newSoftSkill);
      }
      return;
    }));
  }

  // Gets skill object from db by name
  public static async findByNameAsync(skillName: SoftSkillType): Promise<SoftSkill> {
    return getRepository(SoftSkill).findOne({name: skillName});
  }
}

export enum SoftSkillType {
  Test1 = "test1",
  Test2 = "test2",
  Test3 = "test3",
  Test4 = "test4",
  Test5 = "test5",
}
