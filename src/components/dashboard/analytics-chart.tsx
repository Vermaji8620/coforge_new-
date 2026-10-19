"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ChartDataPoint {
  month: string;
  users: number;
  requests: number;
}

const defaultData: ChartDataPoint[] = [
  { month: "Jan", users: 180, requests: 2400 },
  { month: "Feb", users: 260, requests: 3200 },
  { month: "Mar", users: 340, requests: 4100 },
  { month: "Apr", users: 490, requests: 5600 },
  { month: "May", users: 620, requests: 7200 },
  { month: "Jun", users: 810, requests: 9400 },
];

export function AnalyticsChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Activity & Scale Overview
            </CardTitle>
            <CardDescription>
              Real-time platform metrics and active connections
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            +28.4%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={defaultData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.5} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(24, 24, 27, 0.9)",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsChart;
