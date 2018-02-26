import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ProgramRequests } from "./ProgramRequests";

@Entity()
export class SoftSkills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => ProgramRequests, programRequests => programRequests.softSkills)
  programRequests: ProgramRequests[];
}
