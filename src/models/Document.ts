import mongoose, { Schema, Document as MongoDocument, Model } from "mongoose";

export interface IExtractedField {
  label: string;
  value: string;
  confidence: number;
  fieldIndex?: number;
  status?: "verified" | "review";
}

export interface IRiskClause {
  id: string;
  name: string;
  section: string;
  severity: "Critical" | "High" | "Medium" | "Low" | "Within policy";
  confidence: number;
  description: string;
  snippet?: string;
}

export interface IPipelineSteps {
  ocr: "complete" | "running" | "queued" | "failed";
  ocrProgress?: number;
  classify: "complete" | "running" | "queued" | "failed";
  classifyProgress?: number;
  extract: "complete" | "running" | "queued" | "failed";
  extractProgress?: number;
  comply: "complete" | "flagged" | "running" | "queued" | "failed";
  complyProgress?: number;
}

export interface IDocumentItem extends MongoDocument {
  title: string;
  type: string;
  fileType: "pdf" | "tiff" | "docx";
  pages: number;
  fileSize: string;
  confidence: number;
  status: "Flagged" | "Approved" | "Needs review" | "Processing" | "Queued" | "Complete";
  workspace: string;
  compliancePolicy: string;
  processedAt: string;
  renewalDate?: string;
  annualValue?: number;
  counterparty?: string;
  extractedFields: IExtractedField[];
  riskClauses: IRiskClause[];
  pipeline: IPipelineSteps;
  matchScore?: number;
  highlightSnippet?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExtractedFieldSchema = new Schema<IExtractedField>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  confidence: { type: Number, required: true },
  fieldIndex: { type: Number },
  status: { type: String, enum: ["verified", "review"], default: "verified" },
});

const RiskClauseSchema = new Schema<IRiskClause>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  section: { type: String, required: true },
  severity: {
    type: String,
    enum: ["Critical", "High", "Medium", "Low", "Within policy"],
    required: true,
  },
  confidence: { type: Number, required: true },
  description: { type: String, required: true },
  snippet: { type: String },
});

const PipelineStepsSchema = new Schema<IPipelineSteps>({
  ocr: { type: String, default: "queued" },
  ocrProgress: { type: Number, default: 0 },
  classify: { type: String, default: "queued" },
  classifyProgress: { type: Number, default: 0 },
  extract: { type: String, default: "queued" },
  extractProgress: { type: Number, default: 0 },
  comply: { type: String, default: "queued" },
  complyProgress: { type: Number, default: 0 },
});

const DocumentSchema = new Schema<IDocumentItem>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    fileType: { type: String, enum: ["pdf", "tiff", "docx"], default: "pdf" },
    pages: { type: Number, required: true, default: 1 },
    fileSize: { type: String, required: true, default: "1.0 MB" },
    confidence: { type: Number, required: true, default: 95 },
    status: {
      type: String,
      enum: ["Flagged", "Approved", "Needs review", "Processing", "Queued", "Complete"],
      default: "Processing",
    },
    workspace: { type: String, default: "Legal · Contracts" },
    compliancePolicy: { type: String, default: "Commercial contracts v4" },
    processedAt: { type: String, default: "Just now" },
    renewalDate: { type: String },
    annualValue: { type: Number },
    counterparty: { type: String },
    matchScore: { type: Number },
    highlightSnippet: { type: String },
    extractedFields: [ExtractedFieldSchema],
    riskClauses: [RiskClauseSchema],
    pipeline: { type: PipelineStepsSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  }
);

export const DocumentModel: Model<IDocumentItem> =
  mongoose.models.Document || mongoose.model<IDocumentItem>("Document", DocumentSchema);

export default DocumentModel;
