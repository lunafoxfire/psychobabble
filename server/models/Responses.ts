import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Videos } from "./Videos";
import { Programs } from "./Programs";

@Entity()
export class Responses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sound_ref: string;

  @Column()
  text_version: string;

  @Column()
  score: number;

  @ManyToOne(type => Users, user => user.responses)
  user: Users;

  @ManyToOne(type => Videos, video => video.responses)
  video: Videos;

  @ManyToOne(type => Programs, program => program.responses)
  program: Programs;
}
