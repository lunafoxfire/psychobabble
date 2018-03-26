import { fixThis } from './../utility/fix-this';
import { reqRequire, requireRole } from './../utility/req-require';
import { UserService } from './../services/user.service';
import { RoleType } from './../models/Role';

export interface UserControllerDependencies {
  userService: UserService;
}

export class UserController {
  private userService: UserService;

  constructor(dependencies: UserControllerDependencies = null) {
    this.userService = dependencies ? dependencies.userService : new UserService();
    fixThis(this, UserController);
  }

  public async getClients(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['query', 400, "Request query params missing",
          ['page', 400, "Missing 'page' in query params"],
          ['resultCount', 400, "Missing 'resultCount' in query params"],
          ['searchTerm', 400, "Missing 'searchTerm' in query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let clients = await this.userService.getClients(req.query.page, req.query.resultCount, req.query.searchTerm);
      if(clients) {
        res.status(200);
        res.json({
          clients: clients,
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

  public async getProgramSubjects(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['programId', 400, "Missing 'programId' in route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let subjects = await this.userService.getProgramSubjects(req.params.programId);
      if(subjects) {
        res.status(200);
        res.json({
          subjects: subjects,
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

  public async getTopSubjects(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request route params missing",
          ['programId', 400, "Missing 'programId' in route params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin, RoleType.Client])) { return; }
      let subjects = await this.userService.getTopSubjects(req.params.programId);
      if(subjects) {
        res.status(200);
        res.json({
          subjects: subjects,
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

  public async getClientDetails(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['role', 400, "Malformed auth token"]],
        ['params', 400, "Request rotue params missing",
          ['clientId', 400, "Missing 'clientId' in rotue params"]],
        ['query', 400, "Request query params missing",
          ['requestSearchTerm', 400, "Missing 'requestSearchTerm' in query params"],
          ['requestpage', 400, "Missing 'requestpage' in query params"],
          ['requestResultCount', 400, "Missing 'requestResultCount' in query params"],
          ['programSearchTerm', 400, "Missing 'programSearchTerm' in query params"],
          ['programPage', 400, "Missing 'programPage' in query params"],
          ['programResultCount', 400, "Missing 'programResultCount' in query params"]]
      )) { return; }
      if(!requireRole(req, res, [RoleType.Admin])) { return; }
      let client = await this.userService.getClientDetails(req.params.clientId, req.query);
      if(client) {
        res.status(200);
        res.json({
          client: client,
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

  public async getProfile(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]]
      )) { return; }
      let user = await this.userService.getProfileDetails(req.jwt.id);
      if(user) {
        res.status(200);
        res.json({
          user: user,
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
}
