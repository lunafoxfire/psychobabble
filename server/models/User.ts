import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "./Role";
import { Playlist } from "./Playlist";
import { ProgramRequest } from "./ProgramRequest";
import { Program } from "./Program";
import { Response } from "./Response";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column()
  company_name: string;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @OneToMany(type => Playlist, playlists => playlists.user)
  playlists: Playlist[];

  @OneToMany(type => ProgramRequest, programRequests => programRequests.user)
  programRequests: ProgramRequest[];

  @OneToMany(type => Program, programsMade => programsMade.user)
  programsMade: Program[];

  @OneToMany(type => Program, programsUsed => programsUsed.user)
  programsUsed: Program[];

  @OneToMany(type => Response, responses => responses.user)
  responses: Response[];
}
