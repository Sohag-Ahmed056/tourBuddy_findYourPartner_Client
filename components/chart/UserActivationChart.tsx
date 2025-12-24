"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function UserActivationChart({ users }: { users: any[] }) {
  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts: Record<string, number> = {};
    months.forEach((m) => (counts[m] = 0));

    users.forEach((user) => {
      const month = months[new Date(user.createdAt).getMonth()];
      if (month) counts[month]++;
    });

    return months.map((name) => ({ name, users: counts[name] }));
  }, [users]);

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2rem] h-[400px] shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-black tracking-tight text-zinc-800 dark:text-zinc-200">User Growth</h3>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Monthly Registrations</p>
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
          <Bar dataKey="users" radius={[6, 6, 0, 0]} barSize={32}>
            {chartData.map((_, i) => (
              <Cell key={i} className="fill-blue-500/80 hover:fill-blue-500 transition-colors cursor-pointer" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}