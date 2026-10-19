"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import { dashboardMetrics } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DocumentsChart() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-slate-900">Documents per hour</h2>
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-xs font-semibold text-slate-600">
          {(["24h", "7d", "30d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all",
                timeRange === range
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "hover:text-slate-900"
              )}
            >
              {range === "24h" ? "24 h" : range === "7d" ? "7 d" : "30 d"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dashboardMetrics.hourlyVolume} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <Tooltip
              cursor={{ fill: "rgba(238, 242, 255, 0.6)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white shadow-md">
                      <span className="font-semibold">{payload[0].value}</span> docs at {payload[0].payload.hour}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              fill="#c7d2fe"
              activeBar={{ fill: "#5438dc" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DocumentsChart;
