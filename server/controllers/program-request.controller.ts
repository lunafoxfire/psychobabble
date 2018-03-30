import { fixThis } from './../utility/fix-this';
import { reqRequire, requireRole, exceptionResult } from './../utility/express-utilities';
import { ProgramRequestService, NewProgramRequestOptions } from './../services/program-request.service';
import { UserService } from './../services/user.service';
import { RoleType } from './../models/Role';

export interface ProgramRequestControllerDependencies {
  programRequestService: ProgramRequestService;
  userService: UserService;
}

export class ProgramRequestController {
  private programRequestService: ProgramRequestService;
  private userService: UserService;

  constructor(dependencies: ProgramRequestControllerDependencies = null) {
    this.programRequestService = dependencies ? dependencies.programRequestService : new ProgramRequestService();
    this.userService = dependencies ? dependencies.userService : new UserService();
    fixThis(this, ProgramRequestController);
  }

  public async getAllRequests(req, res) {
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
      let requests = await this.programRequestService.getRequests(req.query.page, req.query.resultCount, req.query.searchTerm);
      if(requests) {
        res.status(200);
        res.json({
          requests: requests,
          message: "Grabbed all the things"
        })
      } else {
        throw new Error("Error getting requests");
      }
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async getPendingClientRequests(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['query', 400, "Request query params missing",
          ['page', 400, "Missing 'page' in request query params"],
          ['resultCount', 400, "Missing 'resultCount' in request query params"],
          ['searchTerm', 400, "Missing 'searchTerm' in request query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Client])) { return; }
      let requests = await this.programRequestService.getPendingClientRequests(req.query.page, req.query.resultCount, req.jwt.id, req.query.searchTerm);
      if(requests) {
        res.status(200);
        res.json({
          requests: requests,
          message: "Grabbed all the things"
        })
      } else {
        throw new Error("An error occured while getting client requests");
      }
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async getRequestDetails(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['requestId', 400, "Missing 'requestId' in request route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let request = await this.programRequestService.getRequestDetails(req.params.requestId);
      if(request) {
        res.status(200);
        res.json({
          request: request,
          message: "Grabbed all the things"
        })
        return;
      } else {
        throw new Error("Request could not be found");
      }
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async getClientRequestDetails(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['requestId', 400, "Missing 'requestId' in request route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Client])) { return; }
      let request = await this.programRequestService.getRequestDetails(req.params.requestId);
      if(request) {
        res.status(200);
        res.json({
          request: request,
          message: "Grabbed all the things"
        })
        return;
      } else {
        throw new Error("Request could not be found");
      }
    }
    catch (err) { exceptionResult(err, res); }
  }

  public async makeProgramRequest(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request body missing",
          ['details', 400, "Missing 'details' in request body"],
          ['jobTitle', 400, "Missing 'jobTitle' in request body"],
          ['expiration', 400, "Missing 'expiration' in request body"],
          ['softSkills', 400, "Missing 'softSkills' in request body"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Client])) { return; }
      let expiration: number = 0;
      if(req.body.expiration) {
        expiration = new Date(req.body.expiration).getTime();
      }
      let result = await this.programRequestService.saveNewAsync({
        client: await this.userService.findByIdAsync(req.jwt.id),
        expiration: expiration,
        text: req.body.details,
        softSkills: req.body.softSkills,
        jobTitle: req.body.jobTitle,
      });
      if(result) {
        res.status(200);
        res.json({
          message: "Success!"
        });
        return;
      } else {
        throw new Error("Could not save program request");
      }
    }
    catch (err) { exceptionResult(err, res); }
  }
}
