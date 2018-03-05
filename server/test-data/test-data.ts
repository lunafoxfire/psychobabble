import { getRepository } from 'typeorm';
import { Playlist } from './../models/Playlist';
import { Program } from './../models/Program';
import { ProgramRequest } from './../models/ProgramRequest';
import { Response } from './../models/Response';
import { Role, RoleName } from './../models/Role';
import { SoftSkill } from './../models/SoftSkill';
import { Tag } from './../models/Tag';
import { User, UserRegistrationOptions } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';
import { Video } from './../models/Video';

// ===== Users =====//
const Clients: UserRegistrationOptions[] = [
  {
    username: "TestClient",
    email: "test1@test.com",
    password: "password1",
    roleName: RoleName.Client,
    preValidated: true
  },
  {
    username: "TestClient2",
    email: "test2@test.com",
    password: "asdfghjklsemicolon",
    roleName: RoleName.Client,
    preValidated: true
  },
];

const Subjects: UserRegistrationOptions[] = [
  {
    username: "TestSubjectA",
    email: "testA@test.com",
    password: "letmein",
    roleName: RoleName.Subject,
    preValidated: true
  },
  {
    username: "TestSubjectC",
    email: "testB@test.com",
    password: "l33th4x",
    roleName: RoleName.Subject,
    preValidated: true
  },
];

// ===== Data Loading Logic =====//
export class TestData {
  public static async loadAllTestDataAsync() {
    console.log("Generating roles...");
    await Role.syncRolesToDbAsync();

    console.log("Generating admin...");
    await User.generateDefaultAdminAsync();

    console.log("Generating users...");
    await getRepository(User).delete({});
    await User.generateDefaultAdminIfNoAdminAsync();
    Clients.forEach(async (user) => {
      await User.registerAsync(user);
    });
    Subjects.forEach(async (user) => {
      await User.registerAsync(user);
    });
  }
}
