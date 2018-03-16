import { ResponseService } from './../services/response.service';
import { fixThis } from './../utility/fix-this';

export class ResponseController {
  responseService: ResponseService;

  constructor(responseService: ResponseService = null) {
    this.responseService = responseService || new ResponseService();
    fixThis(this, ResponseController);
  }

  public async beginResponseProcess(req, res) {
    try {
      res.status(501).send();
    }
    catch (err) {
      console.logDev(err);
      res.status(500);
      res.json({
        message: "Unknown error"
      });
      return;
    }
  }
}
