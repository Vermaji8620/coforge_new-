"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search as SearchIcon,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  match: number;
  snippetPrefix: string;
  snippetHighlight: string;
  snippetSuffix: string;
  renewalDate: string;
  value: string;
  counterparty: string;
  page: number;
}

const mockResults: SearchResult[] = [
  {
    id: "doc-1",
    title: "MSA - Northwind Logistics",
    severity: "Critical",
    match: 97,
    snippetPrefix: "...This Agreement ",
    snippetHighlight: "shall automatically renew for successive one-year terms",
    snippetSuffix: " unless terminated in accordance with Section 14...",
    renewalDate: "1 Dec 2026",
    value: "$480,000",
    counterparty: "Northwind Logistics",
    page: 12,
  },
  {
    id: "doc-5",
    title: "Order form - Brightline Analytics",
    severity: "High",
    match: 94,
    snippetPrefix: "...Subscription term ",
    snippetHighlight: "renews automatically at then-current list price",
    snippetSuffix: " ; no notice requirement applies...",
    renewalDate: "15 Jan 2027",
    value: "$312,000",
    counterparty: "Brightline",
    page: 2,
  },
  {
    id: "doc-6",
    title: "Vendor agreement - Cobalt Facilities",
    severity: "High",
    match: 91,
    snippetPrefix: "...The term ",
    snippetHighlight: "will be extended automatically by twelve (12) months",
    snippetSuffix: " on each anniversary...",
    renewalDate: "28 Feb 2027",
    value: "$226,500",
    counterparty: "Cobalt Facilities",
    page: 4,
  },
  {
    id: "doc-7",
    title: "Services contract - Ferro Print Co.",
    severity: "Medium",
    match: 88,
    snippetPrefix: "...Unless either party objects, ",
    snippetHighlight: "the contract renews on the same terms",
    snippetSuffix: " for a further period of one year...",
    renewalDate: "3 Apr 2027",
    value: "$94,000",
    counterparty: "Ferro Print Co.",
    page: 7,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState(
    "Vendor contracts that auto-renew before June 2027 without a termination notice period"
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Vendor contract"]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([
    "Critical",
    "High",
    "Medium",
  ]);
  const [minConfidence, setMinConfidence] = useState(85);
  const [sortBy, setSortBy] = useState("Renewal date");

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const toggleRisk = (r: string) => {
    setSelectedRisks((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r]
    );
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Search Input Bar with AI sparkle */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Sparkles className="w-5 h-5 text-[#5438dc] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question or describe documents to find..."
              className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc]"
            />
          </div>
          <button className="bg-[#5438dc] hover:bg-[#472fc4] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-[#5438dc]/20 flex-shrink-0">
            Search
          </button>
        </div>

        {/* AI Understood Query Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Understood as:</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eeebfd] text-[#5438dc] font-semibold">
            Type: Vendor contract
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eeebfd] text-[#5438dc] font-semibold">
            Renewal: Automatic
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eeebfd] text-[#5438dc] font-semibold">
            Renews before 30 Jun 2027
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eeebfd] text-[#5438dc] font-semibold">
            Notice period: none
          </span>
          <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors">
            Edit filters
          </button>
        </div>
      </div>

      {/* Main 2-Column Search Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Column */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6 h-fit">
          {/* Document Type */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Document Type
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: "Vendor contract", count: 14 },
                { label: "Order form", count: 9 },
                { label: "MSA", count: 6 },
                { label: "Amendment", count: 3 },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(item.label)}
                      onChange={() => toggleType(item.label)}
                      className="w-4 h-4 rounded text-[#5438dc] focus:ring-[#5438dc]"
                    />
                    <span className="font-medium text-slate-700 group-hover:text-slate-900">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-medium">
                    {item.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Risk Level
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: "Critical", color: "bg-rose-50 text-rose-700 border-rose-200" },
                { label: "High", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { label: "Medium", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
                { label: "Low", color: "bg-blue-50 text-blue-700 border-blue-200" },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRisks.includes(item.label)}
                    onChange={() => toggleRisk(item.label)}
                    className="w-4 h-4 rounded text-[#5438dc] focus:ring-[#5438dc]"
                  />
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[11px] font-semibold border",
                      item.color
                    )}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Counterparty
            </h4>
            <input
              type="text"
              placeholder="Any"
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5438dc]/20 focus:border-[#5438dc]"
            />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Minimum Confidence
            </h4>
            <input
              type="range"
              min="50"
              max="99"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-full accent-[#5438dc]"
            />
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              {minConfidence}% and above
            </div>
          </div>
        </div>

        {/* Right Search Results Column */}
        <div className="lg:col-span-3 space-y-4">
          {/* AI Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-2">
            <div className="text-[11px] font-bold text-[#5438dc] tracking-wider uppercase">
              Answer from 14 documents
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              14 vendor contracts auto-renew before 30 June 2027 with no notice period.{" "}
              <strong className="font-bold text-slate-900">
                4 renew in the next 90 days
              </strong>
              , totalling about $1.2M in annual value. Northwind Logistics renews first, on 1 December 2026.
            </p>
          </div>

          {/* Results count & Sort Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <div>14 results · 0.38 s</div>
            <div className="flex items-center gap-2">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none"
              >
                <option value="Renewal date">Renewal date</option>
                <option value="Match score">Match score</option>
                <option value="Contract value">Contract value</option>
              </select>
            </div>
          </div>

          {/* Result Cards List */}
          <div className="space-y-3">
            {mockResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-[#5438dc]/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Link
                      href={`/documents/${result.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-[#5438dc]"
                    >
                      {result.title}
                    </Link>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[11px] font-semibold border",
                        result.severity === "Critical"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : result.severity === "High"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      )}
                    >
                      {result.severity}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    <span className="font-bold text-slate-900">{result.match}%</span>{" "}
                    match
                  </div>
                </div>

                {/* Highlight Snippet */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {result.snippetPrefix}
                  <mark className="bg-[#fef08a] px-1 py-0.5 rounded text-slate-900 font-medium">
                    {result.snippetHighlight}
                  </mark>
                  {result.snippetSuffix}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium pt-1">
                  <div>
                    Renews{" "}
                    <strong className="text-slate-800">{result.renewalDate}</strong>
                  </div>
                  <span>·</span>
                  <div>
                    Value <strong className="text-slate-800">{result.value}</strong>
                  </div>
                  <span>·</span>
                  <div>
                    Counterparty{" "}
                    <strong className="text-slate-800">
                      {result.counterparty}
                    </strong>
                  </div>
                  <span>·</span>
                  <div>
                    Page <strong className="text-slate-800">{result.page}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
