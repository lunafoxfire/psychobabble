import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, getRepository } from "typeorm";
import { Video } from './Video';
import { User } from "./User";
import { Response } from "./Response";

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  description: string;

  // UNIX timestamp
  @Column({type:'bigint', nullable: true})
  expiration: number;

  @Column()
  closed: boolean;

  @ManyToMany(type => Video, video => video.programs)
  @JoinTable()
  videos: Video[];

  @ManyToOne(type => User, user => user.clientPrograms)
  client: User;

  @ManyToOne(type => User, maker => maker.createdPrograms)
  author: User;

  @OneToMany(type => Response, responses => responses.program)
  responses: Response[];

  public static async saveNewAsync(programOptions: NewProgramOptions): Promise<Program> {
    let programRepo = await getRepository(Program);
    let newProgram = new Program();
      newProgram.description = programOptions.description;
      newProgram.expiration = programOptions.expiration;
      newProgram.closed = false;
      newProgram.videos = programOptions.videos;
      newProgram.client = programOptions.client;
      newProgram.author = programOptions.author;
    return programRepo.save(newProgram);
  }
}

export interface NewProgramOptions {
  description: string;
  expiration: number;
  videos: Video[];
  client: User;
  author: User;
}
