import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({type:'bigint'})
  expiration: number;

  @OneToOne(type => User)
  user: User;
}