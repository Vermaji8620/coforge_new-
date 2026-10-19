"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
} from "lucide-react";
import { initialComplianceIssues } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CompliancePage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedIssueId, setSelectedIssueId] = useState<string>("issue-1");
  const [isOverridden, setIsOverridden] = useState(false);

  const selectedIssue =
    initialComplianceIssues.find((i) => i.id === selectedIssueId) ||
    initialComplianceIssues[0];

  const severityCounts = {
    all: 17,
    critical: 4,
    high: 6,
    medium: 5,
    low: 2,
  };

  const filteredIssues = initialComplianceIssues.filter((issue) => {
    if (selectedSeverity === "All") return true;
    return issue.severity.toLowerCase() === selectedSeverity.toLowerCase();
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Compliance & audit log
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Policy: Commercial contracts v4 · last 7 days
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
          <Download className="w-4 h-4" />
          Export audit log
        </button>
      </div>

      {/* KPI Severity Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "All open issues", count: severityCounts.all, value: "All", color: "bg-[#5438dc]" },
          { label: "Critical", count: severityCounts.critical, value: "Critical", color: "bg-rose-500" },
          { label: "High", count: severityCounts.high, value: "High", color: "bg-amber-500" },
          { label: "Medium", count: severityCounts.medium, value: "Medium", color: "bg-yellow-500" },
          { label: "Low", count: severityCounts.low, value: "Low", color: "bg-blue-500" },
        ].map((tab) => {
          const isSelected = selectedSeverity === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setSelectedSeverity(tab.value)}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all shadow-sm",
                isSelected
                  ? "border-[#5438dc] bg-white ring-2 ring-[#5438dc]/10"
                  : "border-slate-200/90 bg-white hover:border-slate-300"
              )}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1">
                <span className={cn("w-2 h-2 rounded-sm", tab.color)} />
                <span className="truncate">{tab.label}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">
                {tab.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column: Flagged Issues & Decision Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flagged Issues List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-base font-bold text-slate-900">Flagged issues</h2>
            <span className="text-xs text-slate-400 font-medium">
              {filteredIssues.length} shown
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredIssues.map((issue) => {
              const isActive = issue.id === selectedIssueId;

              return (
                <div
                  key={issue.id}
                  onClick={() => {
                    setSelectedIssueId(issue.id);
                    setIsOverridden(false);
                  }}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                    isActive
                      ? "border-[#5438dc] bg-[#faf9fe]"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                  )}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          issue.severity === "Critical"
                            ? "bg-rose-50 text-rose-700"
                            : issue.severity === "High"
                            ? "bg-amber-50 text-amber-700"
                            : issue.severity === "Medium"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-blue-50 text-blue-700"
                        )}
                      >
                        {issue.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {issue.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      {issue.documentTitle} · {issue.citation}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-semibold text-slate-700">
                      {issue.assignedTo}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {issue.timeAgo}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Decision Trail (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="text-[11px] font-bold text-[#5438dc] tracking-wider uppercase">
                Decision Trail
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {selectedIssue.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {selectedIssue.documentTitle} · {selectedIssue.citation}
              </p>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200/80">
              {selectedIssue.decisionTrail.map((step) => (
                <div key={step.stepNumber} className="relative flex items-start gap-3 pl-1">
                  <div className="w-5 h-5 rounded-full bg-[#eeebfd] text-[#5438dc] border border-[#d8d4fa] flex items-center justify-center font-bold text-[10px] flex-shrink-0 z-10 bg-white">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-slate-900">
                        {step.agentName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                        <span>{step.timestamp}</span>
                        {step.confidence !== "--" && (
                          <span className="font-semibold text-slate-700">
                            {step.confidence}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                    <div className="text-[10px] font-mono text-slate-400">
                      {step.version}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/documents/doc-1"
              className="flex-1 bg-[#5438dc] hover:bg-[#472fc4] text-white py-2.5 rounded-xl font-semibold text-xs text-center transition-colors shadow-sm shadow-[#5438dc]/20"
            >
              Open document
            </Link>
            <button
              onClick={() => setIsOverridden(!isOverridden)}
              className={cn(
                "flex-1 py-2.5 rounded-xl font-semibold text-xs border transition-colors",
                isOverridden
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {isOverridden ? "Decision overridden ✓" : "Override decision"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
