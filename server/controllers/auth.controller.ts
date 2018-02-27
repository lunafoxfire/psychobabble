import { getConnection } from 'typeorm';

export class AuthController {
  async registerAsync(email: string, password: string) {
    console.log(`Registering user\n${email} | ${password}`);
  }
}
