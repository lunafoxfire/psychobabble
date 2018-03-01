import { Entity, Column, PrimaryGeneratedColumn, OneToOne, getRepository } from "typeorm";
import { User } from "./User";
import * as crypto from 'crypto';
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

  public static async generateToken() {
    let tokenRepo = getRepository(Token);
    let minBeforeExpire = 15;
    let newToken = new Token();
    newToken.code = crypto.randomBytes(3).toString('hex');
    newToken.expiration = new Date().getTime() + (minBeforeExpire * 60 * 1000);
    await tokenRepo.save(newToken);
    return newToken;
  }
}
