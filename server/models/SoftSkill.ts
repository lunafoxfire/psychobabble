import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ProgramRequest } from "./ProgramRequest";

@Entity('soft_skills')
export class SoftSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => ProgramRequest, programRequests => programRequests.softSkills)
  programRequests: ProgramRequest[];
}
