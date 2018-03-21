import * as speech from '@google-cloud/speech';
import * as request from 'request';
import { S3 } from 'aws-sdk';
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
      newResponse.audio_url = responseOptions.audio_url;
      newResponse.text_version = null; // TODO: generate this
      newResponse.score = null;
      newResponse.reviewed = false;
      newResponse.subject = responseOptions.subject;
      newResponse.video = responseOptions.video;
      newResponse.program = responseOptions.program;
    return this.responseRepo.save(newResponse);
  }

  /** Generates a signed url for storing the audio in an S3 bucket */
  public async generateAudioUrlAsync(response: Response, awsParams: any): Promise<any> {
    if (response.audio_url) {
      return null;
    }
    let s3 = new S3();
    s3.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    });
    let getUrlAsync = async () => {
      return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', awsParams, async (err, url) => {
          if (err) {
            reject(err);
          }
          else {
            response.audio_url = `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME}/${awsParams.Key}`;
            await this.responseRepo.save(response);
            resolve(url);
          }
        });
      });
    }
    return getUrlAsync();
  }

  public async doSpeechToTextAsync(response: Response) {
    console.logDev(`Begining transcription for response ${response.id}`);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(response.audio_url);
    request.get(response.audio_url, (error, response, body) => {
      if (error) { console.logDev(error); }
      else {
        const client = new speech.SpeechClient();
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 44100,
          languageCode: 'en-US'
        };
        const audio = {
          content: body.toString('base64')
        };
        const request = {
          config: config,
          audio: audio
        };
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        client.recognize(request)
          .then((data) => {
            const transcription = data[0].results
              .map(result => result.alternatives[0].transcript)
              .join('\n');
            console.log(`Transcription: `, transcription);
          })
          .catch((err) => {
            console.logDev(err);
          });
      }
    });
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
