import { getConnection, getManager } from 'typeorm';
import { Users } from "../models/Users";
const crypto = require('crypto');

export class TestController {
  // Resolve => database time
  // Reject => err
  async getTim() {
    let response = await getConnection()
      .query("SELECT NOW()");
    return response[0].now;
  }

  async getTime() {
    let admin = new Users();
    admin.email = "adamtitus76@gmail.com";
    admin.salt = crypto.randomBytes(256);
    admin.hash = crypto.pdkdf2Sync('Password', admin.salt, 100000, 64, 'sha512');
    console.log(admin.hash + " ######## ", + admin.salt);
    let response = await getManager().save(admin);
    return "hi";
  }
}
