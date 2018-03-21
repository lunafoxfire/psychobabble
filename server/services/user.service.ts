import { Repository, getRepository } from 'typeorm';
import { User } from './../models/User';
import { RoleType } from './../models/Role';
import { RoleService } from './role.service';
import { ProgramRequest } from './../models/ProgramRequest'
import { Program } from './../models/Program'

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
    .where("program.closed = :closed AND program.expiration >= :currentTime AND UPPER(program.jobTitle) LIKE :programSearchTerm OR program.closed = :closed AND program.expiration = :zero AND UPPER(program.jobTitle) LIKE :programSearchTerm", { closed: false, currentTime: new Date().getTime(), zero: 0, programSearchTerm: '%'+params.programSearchTerm.toUpperCase()+'%' })
    .skip(params.programPage*params.programResultCount)
    .take(params.programResultCount)
    .getMany()

    let programCount = await this.programRepo.createQueryBuilder("program")
    .innerJoinAndSelect("program.client", "client", "client.id = :id", { id: clientId })
    .where("program.closed = :closed AND program.expiration >= :currentTime AND UPPER(program.jobTitle) LIKE :programSearchTerm OR program.closed = :closed AND program.expiration = :zero AND UPPER(program.jobTitle) LIKE :programSearchTerm", { closed: false, currentTime: new Date().getTime(), zero: 0, programSearchTerm: '%'+params.programSearchTerm.toUpperCase()+'%' })
    .getCount()

    return {
      username: client.username,
      email: client.email,
      programs: programs,
      requests: requests,
      requestCount: requestCount,
      programCount: programCount,
    }
  }

  public async getProfileDetails(userId) {
    return await this.userRepo.findOneById(userId);
  }
}
