import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column({type:'bigint'})
  expiration: number;

  @OneToOne(type => User)
  user: User;
}
