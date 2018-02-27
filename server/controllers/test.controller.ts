import { getConnection, getManager, getRepository } from 'typeorm';
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
    admin.salt = crypto.randomBytes(128).toString('hex');
    admin.hash = crypto.pbkdf2Sync('Password', admin.salt, 1000, 64, 'sha512').toString('hex');
    console.log(admin.hash);
    let finder = await getRepository(Users).findOne({email:admin.email});
    console.log(finder);
    if(finder){
      return `There is already a user with the email of ${admin.email}`;
    }
    let response = await getManager().save(admin);
    return "User registered";
  }
}
