import { User } from '../models/User';
import { getRepository } from 'typeorm';
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken'

export class AuthController {
  public async registerClientAsync(email: string, password: string) {
    console.log(`Registering user\n${email} | ${password}`);

  }

  public validateUser(user, password: string): boolean {
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
    console.log(`Logging in user\n${email} | ${password}`);
  }
}
