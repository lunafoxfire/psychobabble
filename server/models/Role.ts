import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Connection } from "typeorm";
import { User } from "./User";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleName;

  @OneToMany(type => User, users => users.role)
  users: User[];

  // Saves all roles in role enum to db
  public static async syncRolesToDbAsync(connection: Connection) {
    let roleRepo = connection.getRepository(Role);
    let roleList = Object.values(RoleName);
    roleList.forEach(async function(roleName) {
      let roleFinder = await roleRepo.findOne({name: roleName});
      if (!roleFinder) {
        let newRole = new Role();
        newRole.name = roleName;
        await roleRepo.save(newRole);
      }
    });
  }

  public static async getRoleByName(connection: Connection, roleName: RoleName) {
    return await connection.getRepository(Role).findOne({name: roleName});
  }
}

export enum RoleName {
  Admin = "ADMIN",
  Client = "CLIENT",
  Subject = "SUBJECT"
}
