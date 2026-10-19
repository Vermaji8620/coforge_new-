"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { initialBatch } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [workspace, setWorkspace] = useState("Legal · Contracts");
  const [docType, setDocType] = useState("Auto-detect");
  const [compliancePolicy, setCompliancePolicy] = useState("Commercial contracts v4");
  const [routeLowConfidence, setRouteLowConfidence] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const processingFiles = [
    {
      id: "doc-1",
      name: "MSA - Northwind Logistics.pdf",
      extension: "PDF",
      meta: "42 pages · 6.1 MB",
      status: "Needs review",
      statusType: "flagged",
      steps: [
        { label: "OCR", status: "complete" },
        { label: "Classify", status: "complete" },
        { label: "Extract", status: "complete" },
        { label: "Comply · flagged", status: "flagged" },
      ],
    },
    {
      id: "doc-2",
      name: "INV-20944.pdf",
      extension: "PDF",
      meta: "2 pages · 340 KB",
      status: "Extracting · 62%",
      statusType: "running",
      steps: [
        { label: "OCR", status: "complete" },
        { label: "Classify", status: "complete" },
        { label: "Extract · running", status: "running", progress: 62 },
        { label: "Comply", status: "queued" },
      ],
    },
    {
      id: "doc-3",
      name: "scan_0044.tiff",
      extension: "TIF",
      meta: "11 pages · 18.4 MB",
      status: "OCR · 27%",
      statusType: "running",
      steps: [
        { label: "OCR · running", status: "running", progress: 27 },
        { label: "Classify", status: "queued" },
        { label: "Extract", status: "queued" },
        { label: "Comply", status: "queued" },
      ],
    },
    {
      id: "doc-4",
      name: "NDA - Kestrel Bio.docx",
      extension: "DOC",
      meta: "6 pages · 88 KB",
      status: "Complete",
      statusType: "complete",
      steps: [
        { label: "OCR", status: "complete" },
        { label: "Classify", status: "complete" },
        { label: "Extract", status: "complete" },
        { label: "Comply", status: "complete" },
      ],
    },
    {
      id: "doc-8",
      name: "Lease amendment 4 - Unit 4B.pdf",
      extension: "PDF",
      meta: "9 pages · 2.2 MB",
      status: "Queued",
      statusType: "queued",
      steps: [
        { label: "OCR", status: "queued" },
        { label: "Classify", status: "queued" },
        { label: "Extract", status: "queued" },
        { label: "Comply", status: "queued" },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Upload documents
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Each file runs through OCR, Classify, Extract and Comply. You can leave this page; we&apos;ll notify you when review is needed.
        </p>
      </div>

      {/* Top Grid: Dropzone & Live Batch Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dropzone Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]",
              isDragging
                ? "border-[#5438dc] bg-[#f5f3ff]"
                : "border-[#d8d4fa] bg-[#fcfbfe] hover:bg-[#faf9fe]"
            )}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#eeebfd] text-[#5438dc] flex items-center justify-center mb-3">
              <UploadIcon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Drop files to start processing
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              PDF, TIFF, JPG, PNG, DOCX · up to 200 MB per file · 500 files per batch
            </p>

            <div className="flex items-center gap-3 mt-5">
              <label className="cursor-pointer bg-[#5438dc] hover:bg-[#472fc4] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm shadow-[#5438dc]/20 transition-colors">
                Browse files
                <input type="file" multiple className="hidden" />
              </label>
              <button
                type="button"
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Import from Drive
              </button>
            </div>
          </div>

          {/* Configuration Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Workspace
              </label>
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc]"
              >
                <option value="Legal · Contracts">Legal · Contracts</option>
                <option value="Procurement · Operations">Procurement · Operations</option>
                <option value="Finance · Audits">Finance · Audits</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Document type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc]"
              >
                <option value="Auto-detect">Auto-detect</option>
                <option value="Master services agreement">Master services agreement</option>
                <option value="Invoice">Invoice</option>
                <option value="Vendor Agreement">Vendor Agreement</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Compliance policy
              </label>
              <select
                value={compliancePolicy}
                onChange={(e) => setCompliancePolicy(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc]"
              >
                <option value="Commercial contracts v4">Commercial contracts v4</option>
                <option value="GDPR & Data Processing v2">GDPR & Data Processing v2</option>
                <option value="Financial Sanctions & Anti-Bribery">Financial Sanctions & Anti-Bribery</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={routeLowConfidence}
              onChange={(e) => setRouteLowConfidence(e.target.checked)}
              className="w-4 h-4 rounded text-[#5438dc] focus:ring-[#5438dc]"
            />
            <span className="text-xs font-medium text-slate-700">
              Route fields below 90% confidence to human review
            </span>
          </label>
        </div>

        {/* Right Batch Status Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {initialBatch.batchId}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {initialBatch.fileCount} files
              </span>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Overall progress</span>
                <span className="text-slate-900 font-bold">{initialBatch.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#5438dc] h-full rounded-full transition-all"
                  style={{ width: `${initialBatch.progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                {initialBatch.timeRemaining}
              </p>
            </div>

            {/* Live Agent Activity Feed */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Live agent activity
              </div>
              <div className="space-y-3 font-mono text-[11px]">
                {initialBatch.liveActivity.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-600">
                    <span className="text-slate-400 flex-shrink-0">{act.time}</span>
                    <span
                      className={cn(
                        "font-semibold flex-shrink-0",
                        act.agent === "Comply"
                          ? "text-rose-600"
                          : act.agent === "Extract"
                          ? "text-[#5438dc]"
                          : "text-slate-800"
                      )}
                    >
                      {act.agent}
                    </span>
                    <span className="truncate">{act.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Processing Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-5">Processing</h2>

        <div className="space-y-4">
          {processingFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* File Info */}
              <div className="flex items-center gap-3 min-w-[260px]">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase",
                    file.extension === "PDF"
                      ? "bg-slate-100 text-slate-700"
                      : file.extension === "TIF"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-slate-100 text-slate-700"
                  )}
                >
                  {file.extension}
                </div>
                <div>
                  <Link
                    href={`/documents/${file.id}`}
                    className="text-xs font-bold text-slate-900 hover:text-[#5438dc] truncate block max-w-xs"
                  >
                    {file.name}
                  </Link>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {file.meta}
                  </p>
                </div>
              </div>

              {/* Multi-Step Pipeline Indicator */}
              <div className="flex-1 grid grid-cols-4 gap-2 max-w-xl">
                {file.steps.map((st, idx) => {
                  const isComplete = st.status === "complete";
                  const isFlagged = st.status === "flagged";
                  const isRunning = st.status === "running";
                  const isQueued = st.status === "queued";

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            isComplete && "bg-[#5438dc]",
                            isFlagged && "bg-rose-500",
                            isRunning && "bg-emerald-500 animate-ping",
                            isQueued && "bg-slate-300"
                          )}
                        />
                        <span
                          className={cn(
                            "truncate",
                            isComplete && "text-[#5438dc] font-semibold",
                            isFlagged && "text-rose-600 font-semibold",
                            isRunning && "text-slate-800 font-semibold",
                            isQueued && "text-slate-400"
                          )}
                        >
                          {st.label}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            isComplete && "bg-[#5438dc] w-full",
                            isFlagged && "bg-rose-500 w-full",
                            isRunning && "bg-[#5438dc]",
                            isQueued && "w-0"
                          )}
                          style={isRunning ? { width: `${st.progress || 50}%` } : undefined}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Column */}
              <div className="min-w-[120px] text-right">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    file.statusType === "flagged" && "text-rose-600",
                    file.statusType === "running" && "text-slate-700",
                    file.statusType === "complete" && "text-emerald-600",
                    file.statusType === "queued" && "text-slate-400"
                  )}
                >
                  {file.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
