import { getConnection, getManager } from 'typeorm';
import { Users } from "../models/Users";

export class TestController {
  // Resolve => database time
  // Reject => err
  async getTime() {
    let response = await getConnection()
      .query("SELECT NOW()");
    return response[0].now;
  }
}
