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

  constructor(dependencies: UserServiceDependencies = null) {
    this.userRepo = dependencies ? dependencies.userRepo : getRepository(User);
    this.roleService = dependencies ? dependencies.roleService : new RoleService();
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
    console.log(adminRole);
    //TODO: Report this bug
    let adminExists = await this.userRepo.findOne({role: adminRole.id}); // Ignore this type error.
    console.log(adminExists);
    return (adminExists !== undefined || adminExists !== null);
  }
}
