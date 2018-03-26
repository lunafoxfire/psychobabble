import * as Storage from '@google-cloud/storage';
import * as speech from '@google-cloud/speech';
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
      newResponse.audio_gs_path = responseOptions.audio_gs_path;
      newResponse.text_version = null; // TODO: generate this
      newResponse.score = null;
      newResponse.reviewed = false;
      newResponse.subject = responseOptions.subject;
      newResponse.video = responseOptions.video;
      newResponse.program = responseOptions.program;
    return this.responseRepo.save(newResponse);
  }

  /** Generates a signed url for storing the audio in google bucket. */
  public async generateAudioUrlAsync(response: Response): Promise<any> {
    if (response.audio_gs_path) {
      return null;
    }
    const storage = new Storage();
    const bucketName = (process.env.NODE_ENV === 'production') ? 'soft-skills-tester' : 'soft-skills-tester-dev';
    const filePath = `subjects/${response.subject.id}/audio/${response.id}.wav`;
    const expiration = new Date().getTime() + 300000 // 5 min expiration
    const signOptions = {
      action: 'write',
      expires: expiration,
      contentType: "audio/wav"
    };
    // Save path
    response.audio_gs_path = `${bucketName}/${filePath}`;
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

  /** Transcribes the audio of a response using Google Cloud Speech. Returns a promise with the transcription. */
  public async doSpeechToTextAsync(response: Response): Promise<string> {
    console.logDev(`Starting transciption for response: ${response.id}`);
    const client = new speech.SpeechClient();
    const request = {
      config: {
        languageCode: 'en-US'
      },
      audio: {
        uri: response.getGoogleStorageUri()
      }
    };
    return client.longRunningRecognize(request)
      .then((data) => {
        const operation = data[0];
        return operation.promise();
      })
      .then(async (data) => {
        const transcription = data[0].results
          .map(result => {
            return result.alternatives[0].transcript;
          })
          .join('\n');
        response.text_version = transcription;
        await this.responseRepo.save(response);
        console.logDev(`Completed transcription for: ${response.id}`);
        return transcription;
      });
  }

  public async getSubjectResponses(query) {
    return await this.responseRepo.createQueryBuilder("response")
    .innerJoin("response.subject", "subject", "subject.id = :subjectId", { subjectId: query.subjectId })
    .innerJoin("response.program", "program", "program.id = :programId", { programId: query.programId})
    .where("response.reviewed = :reviewed", { reviewed: false })
    .getMany();
  }

  public async scoreResponse(score: number, responseId: string) {
    let response = await this.responseRepo.findOneById(responseId);
    response.score = score;
    response.reviewed = true;
    this.responseRepo.save(response);
    return response;
  }
}

/** All options required to create a new Response. */
export interface NewResponseOptions {
  /** URL of the subject's audio response to the video. */
  audio_gs_path: string;
  /** The subject that this Response belongs to. */
  subject: User;
  /** The Video that this was a Response to. */
  video: Video;
  /** The Program that this Response belongs to. */
  program: Program;
}
