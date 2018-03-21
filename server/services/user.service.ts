import { Repository, getRepository } from 'typeorm';
import { User } from './../models/User';
import { RoleType } from './../models/Role';
import { RoleService } from './role.service';

export interface UserServiceDependencies {
  userRepo: Repository<User>;
  roleService: RoleService;
}

export class UserService {
  private userRepo: Repository<User>;
  private roleService: RoleService;
  public repo: Repository<User>;

  constructor(dependencies: UserServiceDependencies = null) {
    this.userRepo = dependencies ? dependencies.userRepo : getRepository(User);
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
    let client = await this.userRepo.createQueryBuilder("client")
    .where("client.id = :id", { id: clientId})
    .innerJoinAndSelect("client.programRequests", "request", "request.closed = :closed AND UPPER(request.jobTitle) LIKE :requestSearchTerm", { closed: false, requestSearchTerm: '%'+params.requestSearchTerm.toUpperCase()+'%' })
    .innerJoinAndSelect("client.clientPrograms", "program", "program.closed = :closed AND UPPER(program.jobTitle) LIKE :programSearchTerm", { closed: false, programSearchTerm: '%'+params.programSearchTerm.toUpperCase()+'%' })
    .andWhere("program.expiration >= :currentTime OR program.expiration = :zero", { currentTime: new Date().getTime(), zero: 0 })
    .getOne();
    return {
      username: client.username,
      email: client.email,
      programs: client.clientPrograms,
      requests: client.programRequests
    }
  }

  public async getProfileDetails(userId) {
    return await this.userRepo.findOneById(userId);
  }
}
