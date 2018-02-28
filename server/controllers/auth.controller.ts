import { User } from '../models/User';
import { Role, RoleNames } from '../models/Role';
import { getRepository, getManager } from 'typeorm';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  public async registerClientAsync(email: string, password: string) {
    // console.log(`Registering user\n${email} | ${password}`);
    let newUser = new User();
    newUser.role = await getRepository(Role).findOne({name:RoleNames.Client});
    this.getUserRepo().then(userRepo => {
      userRepo.findOne({normalized_email: email.toUpperCase()}).then((user) => {
        if(!user) {
          newUser.email = email;
          newUser.normalized_email = email.toUpperCase();
          newUser.salt = this.getSalt();
          newUser.hash = this.hashPassword(password, newUser.salt);
          getManager().save(newUser);
        }
      });
    });
  }

  public validateUser(user: User, password: string): boolean {
    if(this.hashPassword(password, user.salt) === user.hash) {
      return true;
    }
    return false;
  }

  public async getUserRepo() {
    return await getRepository(User);
  }

  private getSalt(): string {
    return randomBytes(16).toString('hex');
  }

  private hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  private generateJwt(user: User) {
    // Expire in one week
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    return jwt.sign({
      _id: user.id,
      email: user.email,
      exp: expiration.getTime() / 1000
    }, process.env.JWT_SECRET);
  }

  async loginAsync(email: string, password: string) {
    // console.log(`Logging in user\n${email} | ${password}`);
    let user = await this.getUserRepo().then(userRepo => {
      return userRepo.findOne({normalized_email: email.toUpperCase()})
    });
    if(user) {
      console.log(this.validateUser(user, password));
    } else {
      console.log("Your email is wrong");
    }
  }
}
