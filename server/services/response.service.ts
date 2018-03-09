import { Repository, getRepository } from 'typeorm';
import { Response } from './../models/Response';
import { User } from './../models/User';
import { Video } from './../models/Video';
import { Program } from './../models/Program';

export class ResponseService {
  private responseRepo: Repository<Response>;

  constructor(responseRepo: Repository<Response> = null) {
    this.responseRepo = responseRepo || getRepository(Response);
  }

  /** Saves a new Response to the database. */
  public async saveNewAsync(responseOptions: NewResponseOptions) {
    let newResponse = new Response();
      newResponse.audio_url = responseOptions.audio_url;
      newResponse.text_version = null; // TODO: generate this
      newResponse.score = null;
      newResponse.reviewed = false;
      newResponse.subject = responseOptions.subject;
      newResponse.video = responseOptions.video;
      newResponse.program = responseOptions.program;
    return this.responseRepo.save(newResponse);
  }
}

/** All options required to create a new Response. */
export interface NewResponseOptions {
  /** URL of the subject's audio response to the video. */
  audio_url: string;
  /** The subject that this Response belongs to. */
  subject: User;
  /** The Video that this was a Response to. */
  video: Video;
  /** The Program that this Response belongs to. */
  program: Program;
}
