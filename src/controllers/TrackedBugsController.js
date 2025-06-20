import BaseController from "../utils/BaseController.js";

export class TrackedBugsController extends BaseController {
  constructor() {
    super("api/bugs/:bugId/trackedbugs");
  }
}
