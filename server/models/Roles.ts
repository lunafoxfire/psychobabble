import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Users, users => users.role)
  users: Users[];
}
