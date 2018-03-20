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
  public repo: Repository<ProgramRequest>;

  constructor(dependencies: ProgramRequestServiceDependencies = null) {
    this.requestRepo = dependencies ? dependencies.requestRepo : getRepository(ProgramRequest);
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
    this.repo = this.requestRepo;
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
      newRequest.jobTitle = requestOptions.jobTitle;
    return this.requestRepo.save(newRequest);
  }

  public async getRequests(page, resultCount, searchTerm) {
    let requests = await this.requestRepo.createQueryBuilder("request")
    .innerJoinAndSelect("request.client", "client", "request.closed = :closed", { closed: false })
    .where("UPPER(request.jobTitle) LIKE :searchTerm OR UPPER(client.username) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
    .skip(page*resultCount)
    .take(resultCount)
    .orderBy("request.dateCreated", "ASC")
    .getMany();

    return requests.map(function(request) {
      return {
        client: request.client.username,
        requestId: request.id,
        jobTitle: request.jobTitle
      }
    });
  }
  public async getPendingClientRequests(page, resultCount, client) {
    let requests = await this.requestRepo.find({
      where: {
        "client": client.id,
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
        requestId: request.id,
        jobTitle: request.jobTitle
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
      softSkills: request.softSkills,
      jobTitle: request.jobTitle
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
  /** Job title that the requested program is for */
  jobTitle: string;
}
