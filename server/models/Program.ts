import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Video } from './Video';
import { User } from "./User";
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

  @ManyToMany(type => Video, video => video.programs)
  videos: Video[];

  @ManyToOne(type => User, user => user.programsUsed)
  user: User;

  @ManyToOne(type => User, maker => maker.programsMade)
  maker: User;

  @OneToMany(type => Response, responses => responses.program)
  responses: Response[];
}
