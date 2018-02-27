import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { Program } from "./Program";

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sound_ref: string;

  @Column()
  text_version: string;

  @Column()
  score: number;

  @ManyToOne(type => User, user => user.responses)
  user: User;

  @ManyToOne(type => Video, video => video.responses)
  video: Video;

  @ManyToOne(type => Program, program => program.responses)
  program: Program;
}
