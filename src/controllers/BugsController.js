import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.reportBug)
      .get("", this.getAllBugs)
      .get("/:bugId", this.getBugById)
      .get("/:bugId/notes", this.getNotesForBug)
      .put("/:bugId", this.updateBug)
      .delete("/:bugId", this.deleteBug);
  }
  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async reportBug(request, response, next) {
    try {
      const userInfo = request.userInfo;
      const bugData = request.body;
      bugData.creatorId = userInfo.id;
      const reportedBug = await bugsService.reportBug(bugData);
      response.send(reportedBug);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs();
      response.send(bugs);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const bug = await bugsService.getBugById(bugId);
      response.send(bug);
    } catch (error) {
      next(error);
    }
  }

  async getNotesForBug(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const bug = await bugsService.getBugById(bugId);
      const notesForBug = await notesService.getNotesForBug(bug);

      response.send(notesForBug);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const bugUpdateInfo = request.body;
      const bugToUpdate = await bugsService.updateBug(bugId, bugUpdateInfo);
      response.send(bugToUpdate);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const message = await bugsService.deleteBug(bugId);
      response.send(message);
    } catch (error) {
      next(error);
    }
  }
}
