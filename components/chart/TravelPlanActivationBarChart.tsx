"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function TravelPlanChart({ plans }: { plans: any[] }) {
  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts: Record<string, number> = {};
    months.forEach((m) => (counts[m] = 0));

    plans.forEach((plan) => {
      const month = months[new Date(plan.createdAt).getMonth()];
      if (month) counts[month]++;
    });

    return months.map((name) => ({ name, plans: counts[name] }));
  }, [plans]);

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2rem] h-[400px] shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-zinc-800 dark:text-zinc-200">Travel Activity</h3>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Plans Created Per Month</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-100 dark:stroke-zinc-800" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
          <Tooltip 
            cursor={{ fill: "currentColor", opacity: 0.05 }}
            contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: "12px", color: "#fff" }}
          />
          <Bar dataKey="plans" radius={[6, 6, 0, 0]} barSize={32}>
            {chartData.map((_, i) => (
              <Cell key={i} className="fill-emerald-500/80 hover:fill-emerald-500 transition-colors cursor-pointer" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}