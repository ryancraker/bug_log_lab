import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import { UnAuthorized } from "../utils/Errors.js";

export class TrackedBugsController extends BaseController {
  constructor() {
    super("api/trackedbugs");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.trackNewBug);
  }
  async trackNewBug(request, response, next) {
    try {
      const userInfo = request.userInfo;
      const bugToTrack = request.body;
      bugToTrack.accountId = userInfo.id;
      const trackedBug = await trackedBugsService.trackNewBug(bugToTrack);
      response.send(trackedBug);
    } catch (error) {
      next(error);
    }
  }
}
