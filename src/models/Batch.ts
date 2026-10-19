import mongoose, { Schema, Document as MongoDocument, Model } from "mongoose";

export interface ILiveActivity {
  time: string;
  agent: string;
  action: string;
  target: string;
  detail?: string;
}

export interface IBatchItem extends MongoDocument {
  batchId: string;
  fileCount: number;
  progress: number;
  timeRemaining: string;
  liveActivity: ILiveActivity[];
  workspace: string;
  documentType: string;
  compliancePolicy: string;
  routeLowConfidence: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LiveActivitySchema = new Schema<ILiveActivity>({
  time: { type: String, required: true },
  agent: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  detail: { type: String },
});

const BatchSchema = new Schema<IBatchItem>(
  {
    batchId: { type: String, required: true, unique: true },
    fileCount: { type: Number, default: 5 },
    progress: { type: Number, default: 58 },
    timeRemaining: { type: String, default: "About 1 min remaining" },
    liveActivity: [LiveActivitySchema],
    workspace: { type: String, default: "Legal · Contracts" },
    documentType: { type: String, default: "Auto-detect" },
    compliancePolicy: { type: String, default: "Commercial contracts v4" },
    routeLowConfidence: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const BatchModel: Model<IBatchItem> =
  mongoose.models.Batch || mongoose.model<IBatchItem>("Batch", BatchSchema);

export default BatchModel;
