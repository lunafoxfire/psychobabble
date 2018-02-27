import { getConnection, getManager } from 'typeorm';
import { User } from "../models/User";

export class TestController {
  // Resolve => database time
  // Reject => err
  async getTime() {
    let response = await getConnection()
      .query("SELECT NOW()");
    return response[0].now;
  }
}
