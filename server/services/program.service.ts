import { Repository, getRepository } from 'typeorm';
import { Program } from './../models/Program';
import { Video } from './../models/Video';
import { User } from './../models/User';
import { UserService } from './user.service';

export class ProgramService {
  private programRepo: Repository<Program>;

  constructor(programRepo: Repository<Program> = null) {
    this.programRepo = programRepo || getRepository(Program);
  }

  /** Saves a new Program to the database. */
  public async saveNewAsync(programOptions: NewProgramOptions): Promise<Program> {
    let newProgram = new Program();
      newProgram.description = programOptions.description;
      newProgram.expiration = programOptions.expiration;
      newProgram.closed = false;
      newProgram.videos = programOptions.videos;
      newProgram.client = programOptions.client;
      newProgram.author = programOptions.author;
    return this.programRepo.save(newProgram);
  }

  public async getPrograms(page, resultCount) {
    let programs = await this.programRepo.createQueryBuilder("program")
    .where("program.expiration >= :currentTime", { currentTime: new Date().getTime()})
    .skip(page*resultCount)
    .take(resultCount)
    .orderBy("program.expiration", "DESC")
    .getMany();
    return programs.map(function(program) {
      return {
        client: program.client.username,
        author: program.author.username,
        programId: program.id
      }
    });
  }
}

/** All options required to create a new Program. */
export interface NewProgramOptions {
  /** Description of the Program */
  description: string;
  /** Expiration date of the program as a UNIX timestamp */
  expiration: number;
  /** All videos in the Program's playlist. */
  videos: Video[];
  /** The client this program was created for. */
  client: User;
  /** The admin that created this program. */
  author: User;
}
