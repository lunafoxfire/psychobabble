import { getRepository } from 'typeorm';
import { Program, NewProgramOptions } from './../models/Program';
import { ProgramRequest, NewProgramRequestOptions } from './../models/ProgramRequest';
import { Response } from './../models/Response';
import { Role, RoleType } from './../models/Role';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';
import { Tag, TagName } from './../models/Tag';
import { User, UserRegistrationOptions } from './../models/User';
import { ValidationToken } from './../models/ValidationToken';
import { Video, NewVideoOptions } from './../models/Video';

// =========== Users =========== //
const TestClients: UserRegistrationOptions[] = [
  {
    username: "TestClient",
    email: "test1@test.com",
    password: "password1",
    roleType: RoleType.Client,
    preValidated: true
  },
  {
    username: "TestClient2",
    email: "test2@test.com",
    password: "asdfghjklsemicolon",
    roleType: RoleType.Client,
    preValidated: true
  },
  {
    username: "TestClient3",
    email: "test3@test.com",
    password: "drowssap",
    roleType: RoleType.Client,
    preValidated: true
  },
];

const TestSubjects: UserRegistrationOptions[] = [
  {
    username: "TestSubjectA",
    email: "testA@test.com",
    password: "letmein",
    roleType: RoleType.Subject,
    preValidated: true
  },
  {
    username: "TestSubjectB",
    email: "testB@test.com",
    password: "l33th4x",
    roleType: RoleType.Subject,
    preValidated: true
  },
  {
    username: "TestSubjectC",
    email: "testC@test.com",
    password: "goodPass123",
    roleType: RoleType.Subject,
    preValidated: true
  },
  {
    username: "TestSubjectD",
    email: "testD@test.com",
    password: "1passw0rd",
    roleType: RoleType.Subject,
    preValidated: true
  },
  {
    username: "TestSubjectE",
    email: "testE@test.com",
    password: "qwerty76",
    roleType: RoleType.Subject,
    preValidated: true
  },
];

// =========== Videos =========== //
const TestVideos: NewVideoOptions[] = [
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

// =========== Programs =========== //
const TestPrograms = [
  {
    description: "Test Program 1",
    expiration: null,
    videoIndices: [0, 1, 2, 3],
    clientIndex: 0
  },
  {
    description: "Test Program 2",
    expiration: null,
    videoIndices: [4, 5, 6, 7],
    clientIndex: 1
  },
  {
    description: "Test Program 3",
    expiration: null,
    videoIndices: [1, 7, 4],
    clientIndex: 1
  },
  {
    description: "Test Program 4",
    expiration: null,
    videoIndices: [5],
    clientIndex: 2
  },
];

// =========== Programs =========== //
const TestReponses = [
  {
    audio_url: "",
    subjectIndex: 0,
    videoIndex: 0,
    programIndex: 0
  },
  {
    audio_url: "",
    subjectIndex: 0,
    videoIndex: 1,
    programIndex: 0
  },
  {
    audio_url: "",
    subjectIndex: 0,
    videoIndex: 2,
    programIndex: 0
  },
  {
    audio_url: "",
    subjectIndex: 0,
    videoIndex: 3,
    programIndex: 0
  },
  {
    audio_url: "",
    subjectIndex: 1,
    videoIndex: 4,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 1,
    videoIndex: 5,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 1,
    videoIndex: 6,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 1,
    videoIndex: 7,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 2,
    videoIndex: 1,
    programIndex: 2
  },
  {
    audio_url: "",
    subjectIndex: 2,
    videoIndex: 4,
    programIndex: 2
  },
  {
    audio_url: "",
    subjectIndex: 2,
    videoIndex: 7,
    programIndex: 2
  },
  {
    audio_url: "",
    subjectIndex: 3,
    videoIndex: 4,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 3,
    videoIndex: 5,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 3,
    videoIndex: 6,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 3,
    videoIndex: 7,
    programIndex: 1
  },
  {
    audio_url: "",
    subjectIndex: 4,
    videoIndex: 1,
    programIndex: 2
  },
  {
    audio_url: "",
    subjectIndex: 4,
    videoIndex: 4,
    programIndex: 2
  },
  {
    audio_url: "",
    subjectIndex: 4,
    videoIndex: 7,
    programIndex: 2
  },
];

// =========== Programs =========== //
const TestProgramRequests = [
  {
    clientIndex: 0,
    text: "Make me a pizza!",
    softSkills: [SoftSkillType.Test1, SoftSkillType.Test2, SoftSkillType.Test3]
  },
  {
    clientIndex: 0,
    text: "Zoombinis!",
    softSkills: [SoftSkillType.Test4, SoftSkillType.Test5]
  },
  {
    clientIndex: 1,
    text: "Find good employee pl0x",
    softSkills: [SoftSkillType.Test1, SoftSkillType.Test2, SoftSkillType.Test3, SoftSkillType.Test4, SoftSkillType.Test5]
  },
]

// =========== Data Loading Logic =========== //
export class TestData {
  static admin: User = null;
  static clients: User[] = [];
  static subjects: User[] = [];
  static videos: Video[] = [];
  static programs: Program[] = [];
  static responses: Response[] = [];
  static requests: ProgramRequest[] = [];

  public static async loadAllTestDataAsync() {
    console.log("Generating roles...");
    await Role.syncRolesToDbAsync();

    console.log("Generating admin...");
    this.admin = await User.generateDefaultAdminAsync();

    console.log("Generating users...");
    await User.generateDefaultAdminIfNoAdminAsync();
    await Promise.all(TestClients.map(async (user) => {
      this.clients.push(await User.registerAsync(user));
      return;
    }));
    await Promise.all(TestSubjects.map(async (user) => {
      this.subjects.push(await User.registerAsync(user));
      return;
    }));

    console.log("Generating video tags...");
    await Tag.syncTagsToDbAsync();

    console.log("Generating videos...");
    await Promise.all(TestVideos.map(async (video) => {
      this.videos.push(await Video.saveNewAsync(video));
      return;
    }));

    console.log("Generating programs...");
    await Promise.all(TestPrograms.map(async (program) => {
      let newProgram = await Program.saveNewAsync({
        description: program.description,
        expiration: program.expiration,
        videos: program.videoIndices.map(index => this.videos[index]),
        client: this.clients[program.clientIndex],
        author: this.admin
      });
      this.programs.push(newProgram);
      return;
    }));

    console.log("Generating responses...");
    await Promise.all(TestReponses.map(async (response) => {
      let newResponse = await Response.saveNewAsync({
        audio_url: response.audio_url,
        subject: this.subjects[response.subjectIndex],
        video: this.videos[response.videoIndex],
        program: this.programs[response.programIndex]
      });
      this.responses.push(newResponse);
    }));

    console.log("Generating soft skills...");
    await SoftSkill.syncSoftSkillsToDbAsync();

    console.log("Generating program requests...");
    await Promise.all(TestProgramRequests.map(async (request) => {
      let newRequest = await ProgramRequest.saveNewAsync({
        client: this.clients[request.clientIndex],
        text: request.text,
        softSkills: request.softSkills
      });
      this.requests.push(newRequest);
    }));
  }
}
