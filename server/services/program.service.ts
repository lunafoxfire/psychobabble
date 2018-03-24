import { Repository, getRepository } from 'typeorm';
import { Program } from './../models/Program';
import { Video } from './../models/Video';
import { User } from './../models/User';
import { UserService } from './user.service';
import { VideoService } from './video.service';
import { Response } from './../models/Response';

export class ProgramService {
  private programRepo: Repository<Program>;
  private videoRepo: Repository<Video>;
  private responseRepo: Repository<Response>;
  private userService: UserService;
  public repo: Repository<Program>;

  constructor(programRepo: Repository<Program> = null, videoRepo: Repository<Video> = null, responseRepo: Repository<Response> = null, userService: UserService = null) {
    this.programRepo = programRepo || getRepository(Program);
    this.videoRepo = videoRepo || getRepository(Video);
    this.userService = userService || new UserService();
    this.responseRepo = responseRepo || getRepository(Response);
    this.repo = this.programRepo;
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
      newProgram.jobTitle = programOptions.jobTitle;
    return this.programRepo.save(newProgram);
  }

  public async getPrograms(page, resultCount, searchTerm) {
    let programs = await this.programRepo.createQueryBuilder("program")
    .where("program.expiration >= :currentTime OR program.expiration = :zero", { currentTime: new Date().getTime(), zero: 0 })
    .innerJoinAndSelect("program.client", "client", "program.closed = :closed", { closed: false })
    .innerJoinAndSelect("program.author", "author", "program.closed = :closed", { closed: false })
    .andWhere("UPPER(program.jobTitle) LIKE :searchTerm OR UPPER(client.username) LIKE :searchTerm OR UPPER(author.username) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
    .skip(page*resultCount)
    .take(resultCount)
    .orderBy("program.expiration", "DESC")
    .getMany();

    let programCount = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "program.expiration >= :currentTime OR program.expiration = :zero", { currentTime: new Date().getTime(), zero: 0 })
    .innerJoinAndSelect("program.author", "author", "program.expiration >= :currentTime OR program.expiration = :zero", { currentTime: new Date().getTime(), zero: 0 })
    .where("program.closed = :closed", { closed: false })
    .andWhere("UPPER(program.jobTitle) LIKE :searchTerm OR UPPER(client.username) LIKE :searchTerm OR UPPER(author.username) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
    .getCount();

    let thingToReturn = {
      programs: programs.map(function(program) {
        return {
          description: program.description,
          client: program.client.username,
          author: program.author.username,
          programId: program.id,
          jobTitle: program.jobTitle,
        }
      }),
      programCount: programCount
    }
    return thingToReturn;
  }

  public async getClientPrograms(clientId, params) {
    let programs = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "client.id = :clientId", { clientId: clientId })
    .where("program.closed = :closed AND UPPER(program.jobTitle) LIKE :searchTerm AND program.expiration >= :currentTime OR program.closed = :closed AND UPPER(program.jobTitle) LIKE :searchTerm AND program.expiration = :zero", { closed: false, currentTime: new Date().getTime(), searchTerm: '%'+params.searchTerm.toUpperCase()+'%', zero: 0 })
    .skip(params.page*params.resultCount)
    .take(params.resultCount)
    .orderBy("program.expiration", "DESC")
    .getMany();

    let programCount = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "client.id = :clientId", { clientId: clientId })
    .where("program.closed = :closed AND UPPER(program.jobTitle) LIKE :searchTerm AND program.expiration >= :currentTime OR program.closed = :closed AND UPPER(program.jobTitle) LIKE :searchTerm AND program.expiration = :zero", { closed: false, currentTime: new Date().getTime(), searchTerm: '%'+params.searchTerm.toUpperCase()+'%', zero: 0 })
    .getCount();

    return {
      programs: programs.map(function(program) {
        return {
          description: program.description,
          programId: program.id,
          jobTitle: program.jobTitle,
        }
      }),
      programCount: programCount
    }
  }

  /** Returns next video for a Subject in the Program. Returns null if no videos remain. */

  public async getCurrentVideo(programId: string, subjectId: string) {
    let responses = await this.responseRepo.createQueryBuilder("response")
    .innerJoin("response.subject", "subject", "subject.id = :subjectId", { subjectId: subjectId })
    .innerJoin("response.program", "program", "program.id = :programId", { programId: programId })
    .leftJoinAndSelect("response.video", "video")
    .getMany();
    let program = await this.programRepo.createQueryBuilder("program")
    .where("program.id = :programId", { programId: programId })
    .leftJoinAndSelect("program.videos", "video")
    .getOne();

    let video = null;
    for(let i = 0; i < program.videos.length; i++) {
      let match = false;
      for(let j = 0; j < responses.length; j++) {
        if(program.videos[i].id === responses[j].video.id) {
          match = true;
          break;
        }
      }
      if(!match) {
        video = program.videos[i];
        break;
      }
    }
    return video;
  }

  public async getDetails(programId, client: User) {
    let program = await this.programRepo.findOneById(programId);
    if(program.client.id === client.id) {
      return {
        jobTitle: program.jobTitle,
        videos: program.videos
      };
    } else {
      return null;
    }
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
  /** Job title this program is for */
  jobTitle: string;
}
