import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ComplianceIssueModel } from "@/models";
import { initialComplianceIssues, seedDatabaseIfConnected } from "@/lib/data-service";

export async function GET() {
  try {
    await dbConnect();
    await seedDatabaseIfConnected();
    const issues = await ComplianceIssueModel.find({}).lean();
    if (issues && issues.length > 0) {
      return NextResponse.json({ success: true, source: "mongodb", data: issues });
    }
  } catch {
    // MongoDB offline fallback
  }

  return NextResponse.json({ success: true, source: "mock", data: initialComplianceIssues });
}
