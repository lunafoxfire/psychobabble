import { Repository, getRepository } from 'typeorm';
import { ProgramRequest } from './../models/ProgramRequest';
import { User } from './../models/User';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';
import { SoftSkillService } from './soft-skill.service';
import { UnixToDate } from './../utility/unix-date';

export interface ProgramRequestServiceDependencies {
  requestRepo: Repository<ProgramRequest>;
  softSkillService: SoftSkillService;
}

export class ProgramRequestService {
  private requestRepo: Repository<ProgramRequest>;
  private softSkillService: SoftSkillService;
  public repo = this.requestRepo;

  constructor(dependencies: ProgramRequestServiceDependencies = null) {
    this.requestRepo = dependencies ? dependencies.requestRepo : getRepository(ProgramRequest);
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
  }

  /** Saves a new ProgramRequest to the database. */
  public async saveNewAsync(requestOptions: NewProgramRequestOptions): Promise<ProgramRequest> {
    let softSkills: SoftSkill[] = [];
    if (requestOptions.softSkills) {
      await Promise.all(requestOptions.softSkills.map(async (skillId) => {
        softSkills.push(await this.softSkillService.findByIdAsync(skillId));
        return;
      }));
    }
    let newRequest = new ProgramRequest();
      newRequest.client = requestOptions.client;
      newRequest.text = requestOptions.text;
      newRequest.dateCreated = new Date().getTime();
      newRequest.softSkills = softSkills;
      newRequest.expiration = requestOptions.expiration;
      newRequest.closed = false;
    return this.requestRepo.save(newRequest);
  }

  public async getRequests(page, resultCount) {
    let requests = await this.requestRepo.find({
      where: {
        "closed": "false"
      },
      order: {
        "dateCreated": "ASC"
      },
      skip: (page*resultCount),
      take: resultCount });
    return requests.map(function(request) {
      return {
        client: request.client.username,
        requestId: request.id
      }
    });
  }

  public async getRequestDetails(requestId) {
    let request =  await this.requestRepo.findOneById(requestId);
    let expiration;
    if(parseInt(request.expiration) === 0) {
      expiration = "None Requested"
    } else {
      expiration = UnixToDate(request.expiration);
    }
    let thingToReturn = {
      dateCreated: UnixToDate(request.dateCreated),
      expiration: expiration,
      unixExpiration: request.expiration,
      text: request.text,
      client: request.client.username,
      softSkills: request.softSkills
    }
    return thingToReturn;
  }

  public async fulfillRequest(requestId) {
    let request = await this.requestRepo.findOneById(requestId);
    request.closed = true;
    this.requestRepo.save(request);
    return request;
  }
}

/** All options required to create a new ProgramRequest. */
export interface NewProgramRequestOptions {
  /** Client that entered this request. */
  client: User;
  /** Text describing the requested Program. */
  text: string;
  /** Requested program expiration date */
  expiration?: number;
  /** Soft Skills to be included in the requested Program. Optional. */
  softSkills?: number[];
}
