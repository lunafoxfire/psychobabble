import { fixThis } from './../utility/fix-this';
import { UserService } from './../services/user.service';

export class UserController {
  private userService: UserService;
  constructor(userService: UserService = null) {
    fixThis(this, UserController);
    this.userService = userService || new UserService();
  }

  public async getClients(req, res) {
    try {
      if(!req.jwt) {
        res.status(401);
        res.json({
          message: "Missing authentication token"
        });
        return;
      }
      if(req.jwt.role === "ADMIN") {
        let clients = await this.userService.getClients(req.body.page, req.body.resultCount);
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
      } else {
        res.status(401);
        res.json({
          message: "Not Authorized"
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
