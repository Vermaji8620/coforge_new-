"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Search,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import DocumentsChart from "@/components/dashboard/documents-chart";
import { dashboardMetrics, initialDocuments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const recentlyProcessed = [
    {
      id: "doc-1",
      name: "MSA - Northwind Logistics.pdf",
      type: "Master services agreement",
      confidence: "96.4%",
      status: "Flagged",
      processed: "4 min ago",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "doc-2",
      name: "INV-20931.pdf",
      type: "Invoice",
      confidence: "99.1%",
      status: "Flagged",
      processed: "11 min ago",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "doc-4",
      name: "NDA - Kestrel Bio.docx",
      type: "Mutual NDA",
      confidence: "98.8%",
      status: "Approved",
      processed: "18 min ago",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "doc-5",
      name: "Order form - Brightline.pdf",
      type: "SaaS order form",
      confidence: "91.2%",
      status: "Needs review",
      processed: "26 min ago",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "doc-8",
      name: "Lease amendment 3 - Unit 4B.pdf",
      type: "Lease amendment",
      confidence: "97.5%",
      status: "Approved",
      processed: "32 min ago",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Tuesday, 13 October · all workspaces
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask about any document..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc] transition-all shadow-sm"
            />
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-[#5438dc] hover:bg-[#472fc4] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-[#5438dc]/20"
          >
            <Upload className="w-4 h-4" />
            Upload documents
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">
            Documents processed today
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            12,480
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>8.2%</span>
            <span className="text-slate-400 font-normal">vs. yesterday</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">In queue</div>
          <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            342
          </div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            Median wait <span className="text-slate-700 font-semibold">41 s</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">
            Field-level accuracy · 7 days
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            98.6%
          </div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            <span className="text-slate-700 font-semibold">2.1%</span> routed to human review
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">
            Open compliance alerts
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            17
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
              4 critical
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
              6 high
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-900">Pipeline right now</h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All agents healthy
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardMetrics.pipeline.map((stage) => (
            <div
              key={stage.step}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#5438dc]">
                  {stage.step} {stage.name}
                </span>
                <span className="text-slate-500 font-medium">
                  <strong className="text-slate-800">{stage.active}</strong> active
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden my-3">
                <div
                  className="bg-[#5438dc] h-full rounded-full transition-all"
                  style={{ width: `${stage.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{stage.queued} queued</span>
                <span>p50 {stage.p50}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Hourly Volume Recharts */}
        <div className="lg:col-span-2">
          <DocumentsChart />
        </div>

        {/* Right 1 col: Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Alerts</h2>
              <Link
                href="/compliance"
                className="text-xs font-semibold text-[#5438dc] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {dashboardMetrics.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                          alert.severity === "Critical"
                            ? "bg-rose-50 text-rose-700"
                            : alert.severity === "High"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-yellow-50 text-yellow-700"
                        )}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 hover:text-[#5438dc] cursor-pointer">
                      {alert.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {alert.source}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium flex-shrink-0">
                    {alert.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Processed Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Recently processed</h2>
          <Link
            href="/documents"
            className="text-xs font-semibold text-[#5438dc] hover:underline flex items-center gap-1"
          >
            Open archive
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Document</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Confidence</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Processed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentlyProcessed.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 pl-2 font-semibold text-slate-900 group-hover:text-[#5438dc]">
                    <Link href={`/documents/${doc.id}`} className="block">
                      {doc.name}
                    </Link>
                  </td>
                  <td className="py-3.5 text-slate-600">{doc.type}</td>
                  <td className="py-3.5 font-bold text-slate-800">{doc.confidence}</td>
                  <td className="py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                        doc.statusColor
                      )}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2 text-slate-500 font-medium">
                    {doc.processed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
