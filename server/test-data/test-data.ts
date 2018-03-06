import { getRepository } from 'typeorm';
import { Program } from './../models/Program';
import { ProgramRequest } from './../models/ProgramRequest';
import { Response } from './../models/Response';
import { Role, RoleName } from './../models/Role';
import { SoftSkill } from './../models/SoftSkill';
import { Tag, TagName } from './../models/Tag';
import { User, UserRegistrationOptions } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';
import { Video, NewVideoOptions } from './../models/Video';

// =========== Users =========== //
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

// =========== Videos =========== //
const Videos: NewVideoOptions[] = [
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/yee.mp4",
    description: "Yeeeeee",
    tags: [TagName.Test1, TagName.Test2, TagName.Test3]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/testvideo2.mp4",
    description: "A man with a mission",
    tags: [TagName.Test2, TagName.Test4]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/anime.mp4",
    description: "anime is real",
    tags: [TagName.Test5]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/congrats.mp4",
    description: "you did it",
    tags: [TagName.Test1, TagName.Test3]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/friends.mp4",
    description: "blank description",
    tags: []
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/hello.mp4",
    description: "is it me you're looking for?",
    tags: [TagName.Test1, TagName.Test2, TagName.Test3, TagName.Test4, TagName.Test5]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/nuts.mp4",
    description: "",
    tags: [TagName.Test4]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/stats.mp4",
    description: null,
    tags: [TagName.Test4, TagName.Test2]
  },
];

// =========== Data Loading Logic =========== //
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

    console.log("Generating video tags...");
    await Tag.syncTagsToDbAsync();

    console.log("Generating videos...");
    Videos.forEach(async (video) => {
      await Video.saveNewAsync(video);
    });

  }
}
