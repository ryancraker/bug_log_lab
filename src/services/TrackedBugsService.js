import { dbContext } from "../db/DbContext.js";

class TrackedBugsService {
  async trackNewBug(bugToTrack) {
    const trackedBug = await dbContext.TrackedBugs.create(bugToTrack);
    await trackedBug.populate("bug tracker");
    return trackedBug;
  }
}
export const trackedBugsService = new TrackedBugsService();
