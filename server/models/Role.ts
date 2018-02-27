import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleNames;

  @OneToMany(type => User, users => users.role)
  users: User[];
}

export enum RoleNames {
  Admin = "ADMIN",
  Client = "CLIENT",
  User = "USER"
}
