import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, getRepository } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { Program } from "./Program";

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  audio_url: string;

  @Column({nullable: true})
  text_version: string;

  @Column({nullable: true})
  score: number;

  @Column()
  reviewed: boolean;

  @ManyToOne(type => User, user => user.responses)
  subject: User;

  @ManyToOne(type => Video, video => video.responses)
  video: Video;

  @ManyToOne(type => Program, program => program.responses)
  program: Program;

  public static async saveNewAsync(responseOptions: NewResponseOptions) {
    let responseRepo = await getRepository(Response);
    let newResponse = new Response();
      newResponse.audio_url = responseOptions.audio_url;
      newResponse.text_version = null; // TODO: generate this
      newResponse.score = null;
      newResponse.reviewed = false;
      newResponse.subject = responseOptions.subject;
      newResponse.video = responseOptions.video;
      newResponse.program = responseOptions.program;
    return responseRepo.save(newResponse);
  }
}

export interface NewResponseOptions {
  audio_url: string;
  subject: User;
  video: Video;
  program: Program;
}
