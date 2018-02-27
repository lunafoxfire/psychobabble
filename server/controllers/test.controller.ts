import { getConnection, getManager } from 'typeorm';
import { Users } from "../models/Users";

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
    admin.salt = "abc";
    admin.hash = "blahblahblah";
    let response = await getManager().save(admin);
    return "hi";
  }
}
