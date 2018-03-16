import { Repository, getRepository } from 'typeorm';
import { Role, RoleType } from './../models/Role';

export class RoleService {
  private roleRepo: Repository<Role>;
  public repo = this.roleRepo;

  constructor(roleRepo: Repository<Role> = null) {
    this.roleRepo = roleRepo || getRepository(Role);
  }

  /** Saves all roles in the RoleTypes enum to the database. */
  public async syncRolesToDbAsync() {
    let roleList = Object.values(RoleType);
    await Promise.all(roleList.map(async (roleType) => {
      let roleFinder = await this.roleRepo.findOne({name: roleType});
      if (!roleFinder) {
        let newRole = new Role();
        newRole.name = roleType;
        await this.roleRepo.save(newRole);
      }
      return;
    }));
  }

  /** Retrieves a Role from the database by its RoleType */
  public async findByNameAsync(roleType: RoleType): Promise<Role> {
    return this.roleRepo.findOne({name: roleType});
  }
}
