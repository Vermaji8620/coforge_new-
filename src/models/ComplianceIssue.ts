import mongoose, { Schema, Document as MongoDocument, Model } from "mongoose";

export interface IDecisionStep {
  stepNumber: number;
  agentName: string;
  timestamp: string;
  confidence: string;
  description: string;
  version: string;
  status?: string;
}

export interface IComplianceIssueItem extends MongoDocument {
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  documentTitle: string;
  documentId?: string;
  citation: string;
  assignedTo: string;
  timeAgo: string;
  decisionTrail: IDecisionStep[];
  status: "open" | "resolved" | "overridden";
  createdAt: Date;
  updatedAt: Date;
}

const DecisionStepSchema = new Schema<IDecisionStep>({
  stepNumber: { type: Number, required: true },
  agentName: { type: String, required: true },
  timestamp: { type: String, required: true },
  confidence: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: String, required: true },
  status: { type: String },
});

const ComplianceIssueSchema = new Schema<IComplianceIssueItem>(
  {
    title: { type: String, required: true },
    severity: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      required: true,
    },
    documentTitle: { type: String, required: true },
    documentId: { type: String },
    citation: { type: String, required: true },
    assignedTo: { type: String, required: true },
    timeAgo: { type: String, default: "Just now" },
    decisionTrail: [DecisionStepSchema],
    status: {
      type: String,
      enum: ["open", "resolved", "overridden"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export const ComplianceIssueModel: Model<IComplianceIssueItem> =
  mongoose.models.ComplianceIssue ||
  mongoose.model<IComplianceIssueItem>("ComplianceIssue", ComplianceIssueSchema);

export default ComplianceIssueModel;
