import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Playlists } from "./Playlists";
import { Responses } from "./Responses";

@Entity()
export class Programs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({type:'date'})
  expiration;

  @Column()
  closed: boolean;

  @ManyToOne(type => Users, user => user.programsUsed)
  user: Users;

  @ManyToOne(type => Users, maker => maker.programsMade)
  maker: Users;

  @ManyToOne(type => Playlists, playlist => playlist.programs)
  playlist: Playlists;

  @OneToMany(type => Responses, responses => responses.program)
  responses: Responses[];
}
