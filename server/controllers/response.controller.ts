import { fixThis } from './../utility/fix-this';
import { reqRequire } from './../utility/req-require';
import { ResponseService } from './../services/response.service';
import { UserService } from './../services/user.service';
import { VideoService } from './../services/video.service';
import { ProgramService } from './../services/program.service';
import { RoleType } from './../models/Role';

export class ResponseController {
  responseService: ResponseService;
  userService: UserService;
  videoService: VideoService;
  programService: ProgramService;

  constructor(responseService: ResponseService = null) {
    this.responseService = responseService || new ResponseService();
    fixThis(this, ResponseController);
  }

  public async beginResponseProcess(req, res) {
    try {
      if(!reqRequire(req, res,
        ['jwt', 401, "Missing auth token",
          ['id', 400, "Malformed auth token"],
          ['role', 400, "Malformed auth token"]],
        ['body', 400, "Request body missing",
          ['videoId', 400, "Missing 'videoId' in request body"],
          ['programId', 400, "Missing 'programId' in request body"]]
      )) { return; }
      if (req.jwt.role !== RoleType.Client) {
        res.status(401);
        res.json({
          message: "Unauthorized"
        });
      }
      let newResponse = await this.responseService.saveNewAsync({
        audio_url: null,
        subject: await this.userService.findByIdAsync(req.jwt.id),
        video: await this.videoService.findByIdAsync(req.body.videoId),
        program: await this.programService.findByIdAsync(req.body.programId),
      });
      await newResponse.generateAudioUrlAsync();
      await this.responseService.saveAsync();
      res.status(200);
      res.json({
        message: "New response initialized",
        audioUrl: newResponse.audio_url
      })
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
