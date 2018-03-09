import { getRepository } from 'typeorm';
import { Program, NewProgramOptions, ProgramService } from './../models/Program';
import { ProgramRequest, NewProgramRequestOptions, ProgramRequestService } from './../models/ProgramRequest';
import { Response, ResponseService } from './../models/Response';
import { Role, RoleType, RoleService } from './../models/Role';
import { SoftSkill, SoftSkillType, SoftSkillService } from './../models/SoftSkill';
import { Tag, TagType, TagService } from './../models/Tag';
import { User, UserRegistrationOptions, UserService } from './../models/User';
import { ValidationToken, ValidationTokenService } from './../models/ValidationToken';
import { Video, VideoUploadOptions, VideoService } from './../models/Video';

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
const TestVideos = [
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/yee.mp4",
    description: "Yeeeeee",
    tags: [TagType.Customer, TagType.Angry, TagType.Criticism]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/testvideo2.mp4",
    description: "A man with a mission",
    tags: [TagType.Angry, TagType.Pressure]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/anime.mp4",
    description: "anime is real",
    tags: [TagType.Self]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/congrats.mp4",
    description: "you did it",
    tags: [TagType.Customer, TagType.Pressure]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/friends.mp4",
    description: "blank description",
    tags: []
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/hello.mp4",
    description: "is it me you're looking for?",
    tags: [TagType.Customer, TagType.Angry, TagType.Criticism, TagType.Pressure, TagType.Self]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/nuts.mp4",
    description: "",
    tags: [TagType.Pressure]
  },
  {
    url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/stats.mp4",
    description: null,
    tags: [TagType.Pressure, TagType.Angry]
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
    softSkills: [SoftSkillType.StrongWorkEthic, SoftSkillType.PositiveAttitude, SoftSkillType.GoodCommunicationSkills]
  },
  {
    clientIndex: 0,
    text: "Zoombinis!",
    softSkills: [SoftSkillType.TimeManagementAbilities, SoftSkillType.ProblemSolvingSkills]
  },
  {
    clientIndex: 1,
    text: "Find good employee pl0x",
    softSkills: [SoftSkillType.StrongWorkEthic, SoftSkillType.PositiveAttitude, SoftSkillType.GoodCommunicationSkills, SoftSkillType.TimeManagementAbilities, SoftSkillType.ProblemSolvingSkills]
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
    let roleService = new RoleService();
    let userService = new UserService();
    let tagService = new TagService();
    let videoService = new VideoService();
    let programService = new ProgramService();
    let responseService = new ResponseService();
    let softSkillService = new SoftSkillService();
    let requestService = new ProgramRequestService();

    console.log("Generating roles...");
    await roleService.syncRolesToDbAsync();

    console.log("Generating admin...");
    this.admin = await userService.generateDefaultAdminAsync();

    console.log("Generating users...");
    await userService.generateDefaultAdminIfNoAdminAsync();
    await Promise.all(TestClients.map(async (user) => {
      this.clients.push(await userService.registerAsync(user));
      return;
    }));
    await Promise.all(TestSubjects.map(async (user) => {
      this.subjects.push(await userService.registerAsync(user));
      return;
    }));

    console.log("Generating video tags...");
    await tagService.syncTagsToDbAsync();

    console.log("Generating videos...");
    await Promise.all(TestVideos.map(async (video) => {
      let id = await videoService.createEmptyVideo();
      this.videos.push(await videoService.uploadAsync({
        id: id,
        url: video.url,
        description: video.description,
        tags: video.tags
      }));
      return;
    }));

    console.log("Generating programs...");
    await Promise.all(TestPrograms.map(async (program) => {
      let newProgram = await programService.saveNewAsync({
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
      let newResponse = await responseService.saveNewAsync({
        audio_url: response.audio_url,
        subject: this.subjects[response.subjectIndex],
        video: this.videos[response.videoIndex],
        program: this.programs[response.programIndex]
      });
      this.responses.push(newResponse);
    }));

    console.log("Generating soft skills...");
    await softSkillService.syncSoftSkillsToDbAsync();

    console.log("Generating program requests...");
    await Promise.all(TestProgramRequests.map(async (request) => {
      let newRequest = await requestService.saveNewAsync({
        client: this.clients[request.clientIndex],
        text: request.text,
        softSkills: request.softSkills
      });
      this.requests.push(newRequest);
    }));
  }
}
