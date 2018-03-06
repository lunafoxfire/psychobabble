import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { SoftSkill } from "./SoftSkill";
import { User } from "./User";

@Entity('program_requests')
export class ProgramRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, user => user.programRequests)
  client: User;

  @ManyToMany(type => SoftSkill, softSkills => softSkills.programRequests)
  @JoinTable()
  softSkills: SoftSkill[];
}
