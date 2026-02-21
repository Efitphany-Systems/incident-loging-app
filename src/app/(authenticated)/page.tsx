"use client";

/**
 * TODO
 * ** This page code is not optimized its just a quick mockup to show the potential of the dashboard. It needs to be refactored and optimized before production use.
 *
 */

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, AlertTriangle, Ambulance, UserX } from "lucide-react";

export default function Dashboard() {
  // KPI data
  const kpis = [
    { label: "Total Incidents Today", value: "47", icon: AlertCircle, trend: "+12%" },
    { label: "High Severity Incidents", value: "8", icon: AlertTriangle, trend: "+5%" },
    { label: "Medical Incidents", value: "12", icon: Ambulance, trend: "-3%" },
    { label: "Ejections", value: "5", icon: UserX, trend: "No change" },
  ];

  // Incident types donut chart
  const incidentTypes = [
    { name: "Fight", value: 15, color: "#ff6b35" },
    { name: "Weapon", value: 3, color: "#ff4444" },
    { name: "Intoxication", value: 18, color: "#ff8a50" },
    { name: "Medical", value: 12, color: "#ffb366" },
    { name: "Ejection", value: 5, color: "#ffc266" },
    { name: "Backup Call", value: 8, color: "#ffd699" },
  ];

  // Incidents over time line chart
  const incidentsOverTime = [
    { time: "12pm", incidents: 2 },
    { time: "1pm", incidents: 5 },
    { time: "2pm", incidents: 8 },
    { time: "3pm", incidents: 6 },
    { time: "4pm", incidents: 12 },
    { time: "5pm", incidents: 15 },
    { time: "6pm", incidents: 18 },
    { time: "7pm", incidents: 14 },
    { time: "8pm", incidents: 20 },
    { time: "9pm", incidents: 9 },
  ];

  // Recent incidents
  const recentIncidents = [
    { time: "9:47 PM", type: "Fight", location: "Main Stage", severity: "High" },
    { time: "9:38 PM", type: "Intoxication", location: "Bar Right", severity: "Medium" },
    { time: "9:22 PM", type: "Medical", location: "Entry", severity: "High" },
    { time: "9:15 PM", type: "Ejection", location: "Bar Left", severity: "Low" },
    { time: "9:03 PM", type: "Backup Call", location: "Main Stage", severity: "High" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return true ? "bg-red-900 text-red-100" : "bg-red-100 text-red-800";
      case "Medium":
        return true ? "bg-yellow-900 text-yellow-100" : "bg-yellow-100 text-yellow-800";
      case "Low":
        return true ? "bg-green-900 text-green-100" : "bg-green-100 text-green-800";
      default:
        return true ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800";
    }
  };

  const textMutedClass = true ? "text-gray-400" : "text-gray-600";

  return (
    <div className="flex flex-col gap-3">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className={`rounded-xl border p-6 transition-colors`}>
              <div className="mb-4 flex items-start justify-between">
                <div className={`rounded-lg p-3 ${true ? "bg-orange-900/30" : "bg-orange-100"}`}>
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${true ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"}`}
                >
                  {kpi.trend}
                </span>
              </div>
              <p className={`text-sm font-medium ${textMutedClass} mb-1`}>{kpi.label}</p>
              <p className="text-4xl font-bold">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Incident Types Donut Chart */}
        <div className={`rounded-xl border p-6`}>
          <h2 className="mb-4 text-lg font-bold">Incident Types</h2>
          <div className="flex h-64 justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {incidentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: true ? "#1f2937" : "#ffffff",
                    border: true ? "1px solid #374151" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: true ? "#f3f4f6" : "#111827",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {incidentTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: type.color }} />
                <span>{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents Over Time */}
        <div className={`rounded-xl border p-6`}>
          <h2 className="mb-4 text-lg font-bold">Incidents Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={true ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="time" stroke={true ? "#9ca3af" : "#6b7280"} style={{ fontSize: "12px" }} />
                <YAxis stroke={true ? "#9ca3af" : "#6b7280"} style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: true ? "#1f2937" : "#ffffff",
                    border: true ? "1px solid #374151" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: true ? "#f3f4f6" : "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#ff6b35"
                  strokeWidth={3}
                  dot={{ fill: "#ff6b35", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className={`rounded-xl border p-6`}>
        <h2 className="mb-4 text-lg font-bold">Recent Incidents</h2>
        <div className="space-y-3">
          {recentIncidents.map((incident, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg p-4 ${true ? "bg-gray-800" : "bg-gray-50"}`}
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <span className="font-semibold">{incident.type}</span>
                  <span className={`text-xs ${textMutedClass}`}>{incident.time}</span>
                </div>
                <p className={`text-sm ${textMutedClass}`}>{incident.location}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                {incident.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
