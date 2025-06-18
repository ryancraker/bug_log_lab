import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class BugsService {
  async reportBug(bug) {
    const reportedBug = await dbContext.Bugs.create(bug);
    await reportedBug.populate("creator", "name picture");
    return reportedBug;
  }
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find();
    return bugs;
  }
  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId);
    if (bug == null) {
      throw new BadRequest(
        "we got no one here by that alias(id, same diff right?)"
      );
    }
    await bug.populate("creator", "name picture");
    return bug;
  }
  async updateBug(bugId, bugUpdateInfo) {
    const bugToUpdate = await this.getBugById(bugId);
    bugToUpdate.title = bugUpdateInfo.title ?? bugToUpdate.title;
    bugToUpdate.description =
      bugUpdateInfo.description ?? bugToUpdate.description;
    bugToUpdate.priority = bugUpdateInfo.priority ?? bugToUpdate.priority;
    bugToUpdate.closed = bugUpdateInfo.closed ?? bugToUpdate.closed;
    if (bugToUpdate.closed == true) {
      bugToUpdate.closedDate = new Date().toLocaleDateString;
    }

    await bugToUpdate.save();

    return bugToUpdate;
  }

  async deleteBug(bugId) {
    const bugToDelete = await this.getBugById(bugId);
    await bugToDelete.deleteOne();
    return `${bugToDelete.title} has been removed from the queue`;
  }
}
export const bugsService = new BugsService();
