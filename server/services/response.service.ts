import * as Storage from '@google-cloud/storage';
import * as speech from '@google-cloud/speech';
import * as request from 'request';
import * as fs from 'fs';
import { Repository, getRepository } from 'typeorm';
import { Response } from './../models/Response';
import { User } from './../models/User';
import { Video } from './../models/Video';
import { Program } from './../models/Program';

export class ResponseService {
  private responseRepo: Repository<Response>;
  public repo: Repository<Response>;

  constructor(responseRepo: Repository<Response> = null) {
    this.responseRepo = responseRepo || getRepository(Response);
    this.repo = this.responseRepo;
  }

  /** Saves a new Response to the database. */
  public async saveNewAsync(responseOptions: NewResponseOptions) {
    let newResponse = new Response();
      newResponse.gs_path = responseOptions.gs_path;
      newResponse.text_version = null; // TODO: generate this
      newResponse.score = null;
      newResponse.reviewed = false;
      newResponse.subject = responseOptions.subject;
      newResponse.video = responseOptions.video;
      newResponse.program = responseOptions.program;
    return this.responseRepo.save(newResponse);
  }

  /** Generates a signed url for storing the audio in google bucket */
  public async generateAudioUrlAsync(response: Response): Promise<any> {
    if (response.gs_path) {
      return null;
    }
    const storage = new Storage();
    const bucketName = 'soft-skills-tester';
    const filePath = `subjects/${response.subject.id}/audio/${response.id}.wav`;
    const expiration = new Date().getTime() + 300000 // 5 min expiration
    const signOptions = {
      action: 'write',
      expires: expiration,
      contentType: "audio/wav"
    };
    // Save path
    response.gs_path = `${bucketName}/${filePath}`;
    await this.responseRepo.save(response);
    // Get signed url
    return storage
      .bucket(bucketName)
      .file(filePath)
      .getSignedUrl(signOptions)
      .then((response) => {
        return response[0];
      });
  }

  public async doSpeechToTextAsync(response: Response) {
    return;
    // console.logDev(`Begining transcription for response ${response.id}`);
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$");
    // console.log(response.gs_path);
    // request.get(response.gs_path, (error, response, body) => {
    //   if (error) { console.logDev(error); }
    //   else {
    //     const client = new speech.SpeechClient();
    //     const config = {
    //       encoding: 'LINEAR16',
    //       sampleRateHertz: 44100,
    //       languageCode: 'en-US'
    //     };
    //     const audio = {
    //       content: body.toString('base64')
    //     };
    //     const request = {
    //       config: config,
    //       audio: audio
    //     };
    //     console.log("Writing file");
    //     fs.appendFileSync('testfile.wav', body);
    //     console.log("Sending to google...");
    //     client.recognize(request)
    //       .then((data) => {
    //         const transcription = data[0].results
    //           .map(result => result.alternatives[0].transcript)
    //           .join('\n');
    //         console.log(`Transcription: `, transcription);
    //       })
    //       .catch((err) => {
    //         console.logDev(err);
    //       });
    //   }
    // });
  }
}

/** All options required to create a new Response. */
export interface NewResponseOptions {
  /** URL of the subject's audio response to the video. */
  gs_path: string;
  /** The subject that this Response belongs to. */
  subject: User;
  /** The Video that this was a Response to. */
  video: Video;
  /** The Program that this Response belongs to. */
  program: Program;
}
