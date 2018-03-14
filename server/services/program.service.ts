import { Repository, getRepository } from 'typeorm';
import { Program } from './../models/Program';
import { Video } from './../models/Video';
import { User } from './../models/User';
import { UserService } from './user.service';
import { VideoService } from './video.service';

export class ProgramService {
  private programRepo: Repository<Program>;
  private videoRepo: Repository<Video>;
  private userService: UserService;

  constructor(programRepo: Repository<Program> = null, videoRepo: Repository<Video> = null, userService: UserService = null) {
    this.programRepo = programRepo || getRepository(Program);
    this.videoRepo = videoRepo || getRepository(Video);
    this.userService = userService || new UserService();
  }

  /** Saves a new Program to the database. */
  public async saveNewAsync(programOptions: NewProgramOptions): Promise<Program> {
    let _videoRepo = this.videoRepo;
    let videos = await Promise.all(programOptions.videos.map(async function(videoId) {
      return await _videoRepo.findOneById(videoId);
    }));
    let newProgram = new Program();
      newProgram.description = programOptions.description;
      newProgram.expiration = programOptions.expiration;
      newProgram.closed = false;
      newProgram.videos = videos;
      newProgram.client = programOptions.client;
      newProgram.author = programOptions.author;
      console.log(newProgram);
    return this.programRepo.save(newProgram);
  }

  public async getPrograms(page, resultCount) {
    let programs = await this.programRepo.createQueryBuilder("program")
    .where("program.expiration >= :currentTime OR program.expiration = :zero", { currentTime: new Date().getTime(), zero: 0 })
    .innerJoinAndSelect("program.client", "client", "program.closed = :closed", { closed: false })
    .innerJoinAndSelect("program.author", "author", "program.closed = :closed", { closed: false })
    .skip(page*resultCount)
    .take(resultCount)
    .orderBy("program.expiration", "DESC")
    .getMany();
    let thingToReturn =  programs.map(function(program) {
      return {
        description: program.description,
        client: program.client.username,
        author: program.author.username,
        programId: program.id
      }
    });
    return thingToReturn;
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
