import { getConnection } from 'typeorm';

export class AuthController {
  async registerAsync(email: string, password: string) {
    console.log(`Registering user\n${email} | ${password}`);
  }

  async loginAsync(email: string, password: string) {
    console.log(`Logging in user\n${email} | ${password}`);
  }
}
