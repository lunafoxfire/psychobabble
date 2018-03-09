import { Repository, getRepository } from 'typeorm';
import { Program } from './../models/Program';
import { Video } from './../models/Video';
import { User } from './../models/User';

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
