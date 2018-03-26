import { fixThis } from './../utility/fix-this';
import { reqRequire, requireRole } from './../utility/req-require';
import { ProgramService } from './../services/program.service';
import { ProgramRequestService } from './../services/program-request.service';
import { UserService } from './../services/user.service';
import { RoleType } from './../models/Role';

export interface ProgramControllerDependencies {
  programService: ProgramService;
  programRequestService: ProgramRequestService;
  userService: UserService;
}

export class ProgramController {
  private programService: ProgramService;
  private programRequestService: ProgramRequestService;
  private userService: UserService;

  constructor(dependencies: ProgramControllerDependencies = null) {
    this.programService = dependencies ? dependencies.programService : new ProgramService();
    this.programRequestService = dependencies ? dependencies.programRequestService : new ProgramRequestService();
    this.userService = dependencies ? dependencies.userService : new UserService();
    fixThis(this, ProgramController);
  }

  public async makeProgram(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request body missing",
          ['requestId', 400, "Missing 'requestId' in request body"],
          ['program', 400, "Missing 'program' in request body",
            ['author', 400, "Missing 'program.author' in request body"],
            ['client', 400, "Missing 'program.client' in request body"]]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      //TODO: Check if user exists and if that user is an admin instead, otherwise no error is thrown when database resets on seed.
      req.body.program.author = await this.userService.findByIdAsync(req.jwt.id);
      req.body.program.client = await this.userService.findByUsernameAsync(req.body.program.client);
      let program = await this.programService.saveNewAsync(req.body.program);
      let request = await this.programRequestService.fulfillRequest(req.body.requestId);
      if(program && request) {
        res.status(200);
        res.json({
          program: program,
          message: "saved all the things"
        })
      } else {
        res.status(500);
        res.json({
          message: "Unknown error"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getAllPrograms(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['query', 400, "Request query params missing",
          ['page', 400, "Missing 'page' in request query params"],
          ['resultCount', 400, "Missing 'resultCount' in request query params"],
          ['searchTerm', 400, "Missing 'searchTerm' in request query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let programs = await this.programService.getPrograms(req.query.page, req.query.resultCount, req.query.searchTerm);
      if(programs) {
        res.status(200);
        res.json({
          programs: programs,
          message: "Grabbed all the things"
        })
      } else {
        res.status(500);
        res.json({
          message: "Unknown error"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getProgramDetails(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request body missing",
          ['client', 400, "Missing 'client' in request body"]],
        ['params', 400, "Request route params missing",
          ['programId', 400, "Missing 'programId' in route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Client])) { return; }
      req.body.client = await this.userService.findByIdAsync(req.jwt.id);
      let program = await this.programService.getDetails(req.params.programId, req.body.client);
      if(program) {
        res.status(200);
        res.json({
          program: program,
          message: "Grabbed program details"
        })
      } else {
        res.status(401);
        res.json({
          message: "Not Authorized or Program Not Found"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getProgramDetailsAdmin(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['clientId', 400, "Missing 'clientId' in route params"],
          ['programId', 400, "Missing 'programId' in route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let client = await this.userService.findByIdAsync(req.params.clientId)
      let program = await this.programService.getDetails(req.params.programId, client);
      if(program) {
        res.status(200);
        res.json({
          program: program,
          message: "Grabbed program details"
        })
      } else {
        res.status(401);
        res.json({
          message: "Not Authorized or Program Not Found"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getClientPrograms(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['clientId', 400, "Missing 'clientId' in route params"]],
        ['query', 400, "Request query params missing",
          ['page', 400, "Missing 'page' in query params"],
          ['resultCount', 400, "Missing 'resultCount' in query params"],
          ['searchTerm', 400, "Missing 'searchTerm' in query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Client])) { return; }
      let programs = await this.programService.getClientPrograms(req.params.clientId, req.query);
      if(programs) {
        res.status(200);
        res.json({
          programs: programs,
          message: "Grabbed all the things"
        })
      } else {
        res.status(500);
        res.json({
          message: "Unknown error"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }

  public async getCurrentVideo(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['programId', 400, "Missing 'programId' in route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Subject])) { return; }
      let video = await this.programService.getCurrentVideo(req.params.programId, req.jwt.id);
      if(video) {
        res.status(200);
        res.json({
          video: video,
          message: "Grabbed all the things"
        })
        return;
      } else {
        res.status(200);
        res.json({
          message: "All videos watched"
        });
        return;
      }
    }
    catch(err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }
}
