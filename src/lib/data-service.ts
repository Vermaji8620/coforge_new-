import { dbConnect } from "@/lib/mongodb";
import { DocumentModel, ComplianceIssueModel, BatchModel } from "@/models";
import {
  initialDocuments,
  initialComplianceIssues,
  initialBatch,
} from "./mock-data";

export * from "./mock-data";

/**
 * Seeds MongoDB if it's connected and empty.
 * Returns true if seeded, false otherwise.
 */
export async function seedDatabaseIfConnected(): Promise<boolean> {
  try {
    await dbConnect();
    const docCount = await DocumentModel.countDocuments();
    if (docCount === 0) {
      await DocumentModel.insertMany(initialDocuments);
    }
    const issueCount = await ComplianceIssueModel.countDocuments();
    if (issueCount === 0) {
      await ComplianceIssueModel.insertMany(initialComplianceIssues);
    }
    const batchCount = await BatchModel.countDocuments();
    if (batchCount === 0) {
      await BatchModel.create(initialBatch);
    }
    return true;
  } catch {
    // If MongoDB is not running locally during build or testing, gracefully fallback
    return false;
  }
}
