import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { ProgramRequest } from "./ProgramRequest";

@Entity('soft_skills')
export class SoftSkill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => ProgramRequest, programRequests => programRequests.softSkills)
  programRequests: ProgramRequest[];
}
