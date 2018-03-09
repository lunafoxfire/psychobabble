import { Repository, getRepository } from 'typeorm';
import { ProgramRequest } from './../models/ProgramRequest';
import { User } from './../models/User';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';
import { SoftSkillService } from './soft-skill.service';

export interface ProgramRequestServiceDependencies {
  requestRepo: Repository<ProgramRequest>;
  softSkillService: SoftSkillService;
}

export class ProgramRequestService {
  private requestRepo: Repository<ProgramRequest>;
  private softSkillService: SoftSkillService;

  constructor(dependencies: ProgramRequestServiceDependencies = null) {
    this.requestRepo = dependencies ? dependencies.requestRepo : getRepository(ProgramRequest);
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
  }

  /** Saves a new ProgramRequest to the database. */
  public async saveNewAsync(requestOptions: NewProgramRequestOptions): Promise<ProgramRequest> {
    let softSkills: SoftSkill[] = [];
    if (requestOptions.softSkills) {
      await Promise.all(requestOptions.softSkills.map(async (skillType) => {
        softSkills.push(await this.softSkillService.findByNameAsync(skillType));
        return;
      }));
    }
    let newRequest = new ProgramRequest();
      newRequest.client = requestOptions.client;
      newRequest.text = requestOptions.text;
      newRequest.softSkills = softSkills;
    return this.requestRepo.save(newRequest);
  }
}

/** All options required to create a new ProgramRequest. */
export interface NewProgramRequestOptions {
  /** Client that entered this request. */
  client: User;
  /** Text describing the requested Program. */
  text: string;
  /** Soft Skills to be included in the requested Program. Optional. */
  softSkills?: SoftSkillType[];
}
