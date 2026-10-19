"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { initialDocuments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DocumentDetailClient({ id }: { id?: string }) {
  const doc = initialDocuments.find((d) => d.id === id) || initialDocuments[0];

  const [currentPage, setCurrentPage] = useState(12);
  const [highlightFields, setHighlightFields] = useState(true);
  const [highlightRisks, setHighlightRisks] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/documents" className="hover:text-slate-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Archive
            </Link>
            <span>/</span>
            <span className="text-slate-600">{doc.workspace}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {doc.title.replace(".pdf", "").replace(".docx", "")}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eeebfd] text-[#5438dc] border border-[#d8d4fa]">
              {doc.type} · {doc.confidence}%
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              2 compliance flags
            </span>
            <span className="text-slate-400 font-normal">
              {doc.pages} pages · processed 14:02
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            Send to legal review
          </button>
          <button
            onClick={() => setIsApproved(!isApproved)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5",
              isApproved
                ? "bg-emerald-600 text-white"
                : "bg-[#5438dc] hover:bg-[#472fc4] text-white shadow-[#5438dc]/20"
            )}
          >
            <CheckCircle className="w-4 h-4" />
            {isApproved ? "Approved ✓" : "Approve extraction"}
          </button>
        </div>
      </div>

      {/* Main 2-Column Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Viewer Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200/90 px-4 py-2.5 flex items-center justify-between text-xs font-medium text-slate-600 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-slate-800">
                Page {currentPage} / {doc.pages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(doc.pages, p + 1))}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highlightFields}
                  onChange={(e) => setHighlightFields(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#5438dc]"
                />
                <span className="text-[11px] font-semibold text-[#5438dc]">
                  Field
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highlightRisks}
                  onChange={(e) => setHighlightRisks(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-rose-600"
                />
                <span className="text-[11px] font-semibold text-rose-600">
                  Risk clause
                </span>
              </label>
            </div>
          </div>

          {/* Document Simulated Canvas */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm font-serif text-[13px] leading-relaxed text-slate-800 space-y-5">
            <div className="text-center font-bold tracking-wider text-slate-900 border-b border-slate-100 pb-4 uppercase">
              Master Services Agreement
            </div>

            <p>
              This Agreement is entered into as of{" "}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-sans text-xs transition-colors",
                  highlightFields
                    ? "bg-[#eeebfd] text-[#5438dc] border border-[#c7d2fe]"
                    : "bg-transparent"
                )}
              >
                1 December 2025 <sup className="font-bold text-[10px]">1</sup>
              </span>{" "}
              by and between{" "}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-sans text-xs transition-colors",
                  highlightFields
                    ? "bg-[#eeebfd] text-[#5438dc] border border-[#c7d2fe]"
                    : "bg-transparent"
                )}
              >
                Northwind Logistics, Inc.{" "}
                <sup className="font-bold text-[10px]">2</sup>
              </span>{" "}
              (&quot;Provider&quot;) and Halcyon Retail Group (&quot;Customer&quot;).
            </p>

            <p>
              <strong className="font-sans font-bold text-slate-900">11. Fees.</strong>{" "}
              Customer shall pay Provider an annual fee of{" "}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-sans text-xs transition-colors",
                  highlightFields
                    ? "bg-[#eeebfd] text-[#5438dc] border border-[#c7d2fe]"
                    : "bg-transparent"
                )}
              >
                USD 480,000 <sup className="font-bold text-[10px]">3</sup>
              </span>
              , invoiced quarterly and payable within{" "}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-sans text-xs transition-colors",
                  highlightFields
                    ? "bg-[#eeebfd] text-[#5438dc] border border-[#c7d2fe]"
                    : "bg-transparent"
                )}
              >
                forty-five (45) days{" "}
                <sup className="font-bold text-[10px]">4</sup>
              </span>{" "}
              of receipt.
            </p>

            <p>
              <strong className="font-sans font-bold text-slate-900">
                13. Term and Renewal.
              </strong>{" "}
              <span
                className={cn(
                  "px-1.5 py-1 rounded transition-colors",
                  highlightRisks
                    ? "bg-rose-50 text-rose-900 border border-rose-200"
                    : "bg-transparent"
                )}
              >
                This Agreement shall automatically renew for successive one-year
                terms unless terminated in accordance with Section 14.{" "}
                <sup className="font-bold text-rose-600 text-[10px] font-sans">
                  A
                </sup>
              </span>
            </p>

            <p>
              <strong className="font-sans font-bold text-slate-900">
                15. Limitation of Liability.
              </strong>{" "}
              <span
                className={cn(
                  "px-1.5 py-1 rounded transition-colors",
                  highlightRisks
                    ? "bg-rose-50 text-rose-900 border border-rose-200"
                    : "bg-transparent"
                )}
              >
                Provider&apos;s aggregate liability arising out of this Agreement
                shall not be limited{" "}
                <sup className="font-bold text-rose-600 text-[10px] font-sans">
                  B
                </sup>
              </span>
              , except as expressly provided in Section 15.3 with respect to
              indirect damages.
            </p>

            <p>
              <strong className="font-sans font-bold text-slate-900">
                18. Governing Law.
              </strong>{" "}
              This Agreement shall be governed by the laws of the{" "}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-sans text-xs transition-colors",
                  highlightFields
                    ? "bg-[#eeebfd] text-[#5438dc] border border-[#c7d2fe]"
                    : "bg-transparent"
                )}
              >
                State of Delaware <sup className="font-bold text-[10px]">5</sup>
              </span>
              .
            </p>

            <div className="space-y-2 pt-4">
              <div className="h-2.5 bg-slate-100 rounded w-full" />
              <div className="h-2.5 bg-slate-100 rounded w-5/6" />
              <div className="h-2.5 bg-slate-100 rounded w-4/6" />
            </div>
          </div>
        </div>

        {/* Right: Extracted Fields & Clauses Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Extracted fields</h3>
              <span className="text-xs text-slate-400 font-medium">
                23 fields · 1 to review
              </span>
            </div>

            <div className="space-y-3">
              {doc.extractedFields.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-[#eeebfd] text-[#5438dc] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                      {field.fieldIndex || idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-slate-400 font-medium text-[11px]">
                        {field.label}
                      </div>
                      <div className="font-semibold text-slate-900 truncate">
                        {field.value}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          field.confidence > 90 ? "bg-emerald-500" : "bg-amber-500"
                        )}
                        style={{ width: `${field.confidence}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 w-10 text-right">
                      {field.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Clauses</h3>

            <div className="space-y-3">
              {doc.riskClauses.map((clause) => (
                <div
                  key={clause.id}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all space-y-1.5",
                    clause.severity === "Critical"
                      ? "border-rose-200 bg-rose-50/30"
                      : clause.severity === "High"
                      ? "border-amber-200 bg-amber-50/30"
                      : "border-slate-100 bg-slate-50/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">
                        <span className="text-rose-600 font-mono mr-1.5">
                          {clause.id}
                        </span>
                        {clause.name} · {clause.section}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          clause.severity === "Critical"
                            ? "bg-rose-50 text-rose-700"
                            : clause.severity === "High"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        )}
                      >
                        {clause.severity}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {clause.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
