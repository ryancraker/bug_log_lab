import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData);
    await note.populate("creator", "name picture");
    return note;
  }
  async getNotesForBug(bug) {
    const notesForBug = await dbContext.Notes.find({ bugId: bug._id });
    await notesForBug.forEach((note) =>
      note.populate("creator", "name picture")
    );
    return notesForBug;
  }
  async deleteNote(noteToDelete) {
    const deleteNote = await dbContext.Notes.findById(noteToDelete);
    if (deleteNote == null) {
      throw new BadRequest(
        "we got no one here by that alias(id, same diff right?)"
      );
    }
    // if (deleteNote.creatorId != noteToDelete.creatorId)
    //   throw new UnAuthorized("this ain't you're junk to trash!");

    deleteNote.deleteOne();
    return `'${deleteNote.body}' has been struck from the record`;
  }
}
export const notesService = new NotesService();
