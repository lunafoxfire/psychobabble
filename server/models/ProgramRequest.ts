import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, getRepository } from "typeorm";
import { SoftSkill, SoftSkillType } from "./SoftSkill";
import { User } from "./User";

@Entity('program_requests')
export class ProgramRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  text: string;

  @ManyToOne(type => User, user => user.programRequests)
  client: User;

  @ManyToMany(type => SoftSkill, softSkills => softSkills.programRequests)
  @JoinTable()
  softSkills: SoftSkill[];

  public static async saveNewAsync(requestOptions: NewProgramRequestOptions): Promise<ProgramRequest> {
    let requestRepo = getRepository(ProgramRequest);
    let softSkills: SoftSkill[] = [];
    if (requestOptions.softSkills) {
      await Promise.all(requestOptions.softSkills.map(async (skillType) => {
        softSkills.push(await SoftSkill.findByNameAsync(skillType));
        return;
      }));
    }
    let newRequest = new ProgramRequest();
      newRequest.client = requestOptions.client;
      newRequest.text = requestOptions.text;
      newRequest.softSkills = softSkills;
    return requestRepo.save(newRequest);
  }
}

export interface NewProgramRequestOptions {
  client: User;
  text: string;
  softSkills?: SoftSkillType[];
}
