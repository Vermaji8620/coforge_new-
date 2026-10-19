"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { initialDocuments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredDocs = initialDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Document Archive
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Browse processed legal contracts, extracted metadata, and clause flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contracts..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc] shadow-sm"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 shadow-sm focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Master services agreement">Master services agreement</option>
            <option value="Vendor contract">Vendor contract</option>
            <option value="SaaS order form">SaaS order form</option>
            <option value="Invoice">Invoice</option>
            <option value="Mutual NDA">Mutual NDA</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              <th className="py-3.5 pl-6">Document Name</th>
              <th className="py-3.5">Contract Type</th>
              <th className="py-3.5">Size / Pages</th>
              <th className="py-3.5">Confidence</th>
              <th className="py-3.5">Status</th>
              <th className="py-3.5 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredDocs.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
              >
                <td className="py-4 pl-6 font-semibold text-slate-900 group-hover:text-[#5438dc]">
                  <Link href={`/documents/${doc.id}`} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase flex-shrink-0">
                      {doc.fileType}
                    </div>
                    <span className="truncate max-w-sm">{doc.title}</span>
                  </Link>
                </td>
                <td className="py-4 text-slate-600 font-medium">{doc.type}</td>
                <td className="py-4 text-slate-500 font-medium">
                  {doc.pages} pages · {doc.fileSize}
                </td>
                <td className="py-4 font-bold text-slate-800">{doc.confidence}%</td>
                <td className="py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                      doc.status === "Flagged"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : doc.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    )}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-6">
                  <Link
                    href={`/documents/${doc.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#5438dc] hover:underline"
                  >
                    Inspect
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
