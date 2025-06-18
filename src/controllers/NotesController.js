import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createNote);
  }
  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async createNote(request, response, next) {
    try {
      const userInfo = request.userInfo;
      const noteData = request.body;
      noteData.creatorId = userInfo.id;
      const newNote = await notesService.createNote(noteData);
      response.send(newNote);
    } catch (error) {
      next(error);
    }
  }
}
