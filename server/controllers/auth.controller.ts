import { User } from '../models/User';
import { Role, RoleName } from '../models/Role';
import { getConnection, getRepository } from 'typeorm';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken'

export class AuthController {
  // Returns JWT on successful login
  public async registerClientAsync(email: string, password: string, company_name: string = null) {
    // TODO: Check for unique user
    console.log(`Registering user\n${email} | ${password}`);
    let userRepo = await this.getUserRepo();
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

  public validateUser(user, password: string): boolean {
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

  public async loginAsync(email: string, password: string) {
    console.log(`Logging in user\n${email} | ${password}`);
  }
}
