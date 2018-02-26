import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { SoftSkills } from "./SoftSkills";
import { Users } from "./Users";

@Entity()
export class ProgramRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Users, user => user.programRequests)
  user: Users;

  @ManyToMany(type => SoftSkills, softSkills => softSkills.programRequests)
  @JoinTable()
  softSkills: SoftSkills[];
}
