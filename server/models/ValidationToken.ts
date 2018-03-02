import { Entity, Column, PrimaryGeneratedColumn, OneToOne, getRepository } from "typeorm";
import { User } from "./User";
import * as crypto from 'crypto';
@Entity('validation_tokens')
export class ValidationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({type:'bigint'})
  expiration: number;

  @OneToOne(type => User)
  user: User;

  public static async generateAsync() {
    let tokenRepo = getRepository(ValidationToken);
    let minBeforeExpire = 15;
    let newToken = new ValidationToken();
    newToken.code = crypto.randomBytes(3).toString('hex');
    newToken.expiration = new Date().getTime() + (minBeforeExpire * 60 * 1000);
    await tokenRepo.save(newToken);
    return newToken;
  }

  public static async checkVerify(code: string, userId: string) {
    let userRepo = getRepository(User);
    let currentUser = await userRepo.findOneById(userId);
    if(currentUser.validationToken.code === code && currentUser.validationToken.expiration >= new Date().getTime()) {
      currentUser.validated = true;
      userRepo.save(currentUser);
      return currentUser;
    } else {
      return currentUser;
    }
  }
}
