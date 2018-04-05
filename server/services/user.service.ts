import { Repository, getRepository } from 'typeorm';
import { User } from './../models/User';
import { RoleType } from './../models/Role';
import { RoleService } from './role.service';
import { ProgramRequest } from './../models/ProgramRequest';
import { Program } from './../models/Program';
import { UnixToDate } from './../utility/unix-date';;

export interface UserServiceDependencies {
  userRepo: Repository<User>;
  requestRepo: Repository<ProgramRequest>;
  programRepo: Repository<Program>;
  roleService: RoleService;
}

export class UserService {
  private userRepo: Repository<User>;
  private requestRepo: Repository<ProgramRequest>;
  private programRepo: Repository<Program>;
  private roleService: RoleService;
  public repo: Repository<User>;

  constructor(dependencies: UserServiceDependencies = null) {
    this.userRepo = dependencies ? dependencies.userRepo : getRepository(User);
    this.requestRepo = dependencies ? dependencies.requestRepo : getRepository(ProgramRequest);
    this.programRepo = dependencies ? dependencies.programRepo : getRepository(Program);
    this.roleService = dependencies ? dependencies.roleService : new RoleService();
    this.repo = this.userRepo;
  }

  /** Saves a user to the database. */
  public async saveAsync(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  public async findByIdAsync(id: string) {
    return this.userRepo.findOneById(id);
  }

  /** Finds a user by username accounting for normalization. */
  public async findByUsernameAsync(username: string): Promise<User> {
    return this.userRepo.findOne({normalized_username: User.normalizeField(username)});
  }

  /** Finds a user by email accounting for normalization. */
  public async findByEmailAsync(email: string): Promise<User> {
    return this.userRepo.findOne({normalized_email: User.normalizeField(email)});
  }

  /** Finds a user by username or email for login puposes. */
  public async findByLoginNameAsync(loginName: string): Promise<User> {
    let userByName = await this.findByUsernameAsync(loginName);
    let userByEmail = await this.findByEmailAsync(loginName);
    return (userByName || userByEmail);
  }

  /** Returns true if at least one admin exists in the database. */
  public async doesAdminExistAsync(): Promise<boolean> {
    let adminRole = await this.roleService.findByNameAsync(RoleType.Admin);
    //TODO: Report this bug
    let adminExists = await this.userRepo.findOne({role: adminRole.id}); // Ignore this type error.
    return (adminExists !== undefined && adminExists !== null);
  }

  /** Gets all clients for admin (paginated) */
  public async getClients(page, resultCount, searchTerm) {
    let clientRole = await this.roleService.findByNameAsync(RoleType.Client);
    let clients = await this.userRepo.createQueryBuilder("client")
    .where("client.role = :clientRole", { clientRole: clientRole.id })
    .andWhere("UPPER(client.normalized_username) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
    .skip(page*resultCount)
    .take(resultCount)
    .orderBy("client.username", "ASC")
    .getMany();

    let clientCount = await this.userRepo.createQueryBuilder("client")
    .where("client.role = :clientRole", { clientRole: clientRole.id })
    .andWhere("UPPER(client.normalized_username) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
    .getCount();

    return {
      clients: clients.map(function(client) {
        return {
          username: client.username,
          clientId: client.id,
          email: client.email,
        }
      }),
      clientCount: clientCount
    }
  }

  /** Gets all subjects that have responded to a program (paginated) */
  public async getProgramSubjects(programId) {
    let subjectRole = await this.roleService.findByNameAsync(RoleType.Subject);
    let subjects = await this.userRepo.createQueryBuilder("subject")
    .innerJoin("subject.responses", "response")
    .innerJoin("response.program", "program", "program.id = :programId", { programId: programId })
    .getMany();

    let subjectCount = await this.userRepo.createQueryBuilder("subject")
    .innerJoin("subject.responses", "response")
    .innerJoin("response.program", "program", "program.id = :programId", { programId: programId })
    .getCount();

    return {
      subjects: subjects.map(function(subject) {
        return {
          username: subject.username,
          subjectId: subject.id,
          email: subject.email,
        }
      }),
      subjectCount: subjectCount
    }
  }

  /** Get the top subjects for a program by average response score to that program */
  public async getTopSubjects(programId, page, resultCount) {

    let subjects = await this.userRepo.createQueryBuilder("subject")
    .innerJoinAndSelect("subject.responses", "response")
    .innerJoin("response.program", "program", "program.id = :programId", { programId: programId })
    .skip(page*resultCount)
    .take(resultCount)
    .getMany();

    let subjectCount = await this.userRepo.createQueryBuilder("subject")
    .innerJoinAndSelect("subject.responses", "response")
    .innerJoin("response.program", "program", "program.id = :programId", { programId: programId })
    .getCount();

    return {
      subjects: subjects.map(function(subject) {
        let totalScore: number = 0;
        let numberOfResponses: number = 0;
        subject.responses.forEach(function(response) {
          numberOfResponses++;
          totalScore += response.score;
        })
        let averageScore = totalScore/numberOfResponses;
        return {
          subjectName: subject.username,
          contactInfo: subject.email,
          averageScore: averageScore
        }
      }),
      subjectCount: subjectCount
    }
  }

  /** Gets details of a specific client for admin */
  public async getClientDetails(clientId, params) {
    if(params.requestSearchTerm === 'undefined') {
      params.requestSearchTerm = '';
    }
    if(params.programSearchTerm === 'undefined') {
      params.programSearchTerm = '';
    }
    let client = await this.userRepo.findOneById(clientId);

    let requests = await this.requestRepo.createQueryBuilder("request")
    .innerJoinAndSelect("request.client", "client", "client.id = :id", { id: clientId })
    .where("request.closed = :closed AND UPPER(request.jobTitle) LIKE :requestSearchTerm", { closed: false, requestSearchTerm: '%'+params.requestSearchTerm.toUpperCase()+'%' })
    .skip(params.requestPage*params.requestResultCount)
    .take(params.requestResultCount)
    .getMany();

    let requestCount = await this.requestRepo.createQueryBuilder("request")
    .innerJoinAndSelect("request.client", "client", "client.id = :id", { id: clientId })
    .where("request.closed = :closed AND UPPER(request.jobTitle) LIKE :requestSearchTerm", { closed: false, requestSearchTerm: '%'+params.requestSearchTerm.toUpperCase()+'%' })
    .getCount();

    let programs = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "client.id = :id", { id: clientId })
    .where("UPPER(program.jobTitle) LIKE :programSearchTerm", { programSearchTerm: '%'+params.programSearchTerm.toUpperCase()+'%' })
    .skip(params.programPage*params.programResultCount)
    .take(params.programResultCount)
    .getMany()

    let programCount = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "client.id = :id", { id: clientId })
    .where("UPPER(program.jobTitle) LIKE :programSearchTerm", { programSearchTerm: '%'+params.programSearchTerm.toUpperCase()+'%' })
    .getCount()

    let returnRequests = requests.map(function(request) {
      return {
        jobTitle: request.jobTitle,
        text: request.text,
        dateCreated: UnixToDate(request.dateCreated),
        id: request.id
      }
    })

    let returnPrograms = programs.map(function(program) {
      if(program.expiration.toString() !== "0") {
        if(program.expiration <= new Date().getTime())
        {
          program.closed = true;
        }
      }
      return {
        jobTitle: program.jobTitle,
        description: program.description,
        closed: program.closed,
        id: program.id
      }
    })

    return {
      username: client.username,
      email: client.email,
      programs: returnPrograms,
      requests: returnRequests,
      requestCount: requestCount,
      programCount: programCount,
    }
  }

  public async getProfileDetails(userId) {
    return await this.userRepo.findOneById(userId);
  }
}
