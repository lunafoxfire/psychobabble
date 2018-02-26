import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Roles } from "./Roles";
import { Playlists } from "./Playlists";
import { ProgramRequests } from "./ProgramRequests";
import { Programs } from "./Programs";
import { Responses } from "./Responses";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @ManyToOne(type => Roles, role => role.users)
  role: Roles;

  @OneToMany(type => Playlists, playlists => playlists.user)
  playlists: Playlists[];

  @OneToMany(type => ProgramRequests, programRequests => programRequests.user)
  programRequests: ProgramRequests[];

  @OneToMany(type => Programs, programsMade => programsMade.user)
  programsMade: Programs[];

  @OneToMany(type => Programs, programsUsed => programsUsed.user)
  programsUsed: Programs[];

  @OneToMany(type => Responses, responses => responses.user)
  responses: Responses[];
}
