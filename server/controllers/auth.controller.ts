import { User } from '../models/User';
import { Role, RoleName } from '../models/Role';
import { getConnection, getRepository } from 'typeorm';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  // Returns JWT on successful login
  public async registerClientAsync(email: string, password: string, company_name: string = null) {
    console.log(`Registering user\n${email} | ${password}`);
    let userRepo = await this.getUserRepo();
    let userExists = await userRepo.findOne({normalized_email: email.toUpperCase()});
    if (!userExists) {
      let user = new User();
      user.email = email;
      user.normalized_email = email.toUpperCase();
      user.salt = this.genSalt();
      user.hash = this.hashPassword(password, user.salt);
      user.company_name = company_name;
      user.role = await Role.getRoleByName(getConnection(), RoleName.Client);

      userRepo.save(user);
      return this.generateJwt(user);
    }
    else {
      return null;
    }
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

  private genSalt(): string {
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
