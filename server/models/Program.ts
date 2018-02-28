import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Playlist } from "./Playlist";
import { Response } from "./Response";

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column({type:'bigint'})
  expiration: number;

  @Column()
  closed: boolean;

  @ManyToOne(type => User, user => user.programsUsed)
  user: User;

  @ManyToOne(type => User, maker => maker.programsMade)
  maker: User;

  @ManyToOne(type => Playlist, playlist => playlist.programs)
  playlist: Playlist;

  @OneToMany(type => Response, responses => responses.program)
  responses: Response[];
}
