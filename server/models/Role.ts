import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
  getRepository
} from "typeorm";
import { User } from "./User";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleType;

  @OneToMany(type => User, users => users.role)
  users: User[];

  // Saves all roles in role enum to db
  public static async syncRolesToDbAsync() {
    let roleRepo = getRepository(Role);
    let roleList = Object.values(RoleType);
    await Promise.all(roleList.map(async (roleType) => {
      let roleFinder = await roleRepo.findOne({name: roleType});
      if (!roleFinder) {
        let newRole = new Role();
        newRole.name = roleType;
        await roleRepo.save(newRole);
      }
      return;
    }));
  }

  // Gets role object from db by name
  public static async findByNameAsync(roleType: RoleType): Promise<Role> {
    return getRepository(Role).findOne({name: roleType});
  }
}

export enum RoleType {
  Admin = "ADMIN",
  Client = "CLIENT",
  Subject = "SUBJECT"
}
