import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const branches = ["CSE", "ECE", "ME", "CIVIL"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const branchData = [
  { branch: "CSE", issued: 320 },
  { branch: "ECE", issued: 240 },
  { branch: "ME", issued: 180 },
  { branch: "CIVIL", issued: 150 },
];

const subjectData = {
  CSE: [
    { subject: "DSA", issued: 140 },
    { subject: "OS", issued: 100 },
    { subject: "DBMS", issued: 80 },
  ],
  ECE: [
    { subject: "Circuits", issued: 90 },
    { subject: "Signals", issued: 80 },
    { subject: "Communication", issued: 70 },
  ],
};

const activeUsersData = [
  { year: "1st", active: 80 },
  { year: "2nd", active: 95 },
  { year: "3rd", active: 120 },
  { year: "4th", active: 100 },
];

const overdueTrendData = [
  { month: "Jan", overdue: 20 },
  { month: "Feb", overdue: 35 },
  { month: "Mar", overdue: 15 },
  { month: "Apr", overdue: 25 },
  { month: "May", overdue: 30 },
];

const monthlyIssuanceData = [
  { month: "Jan", issued: 220 },
  { month: "Feb", issued: 180 },
  { month: "Mar", issued: 240 },
  { month: "Apr", issued: 260 },
  { month: "May", issued: 280 },
];

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd"];

export default function Analytics() {
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const [selectedYear, setSelectedYear] = useState("1st Year");

  return (
    <div className="p-6 space-y-6">
      <motion.h2 className="text-3xl font-bold text-[#1b365d]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        📊 Library Analytics - Deep Insights
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="border p-2 rounded-md">
          {branches.map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border p-2 rounded-md">
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Issuance by Branch */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Issued Books by Branch</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issued" fill="#3a7ce1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Subjects - Pie */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Top Subjects in {selectedBranch}</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={subjectData[selectedBranch]} dataKey="issued" nameKey="subject" cx="50%" cy="50%" outerRadius={80} label>
                {subjectData[selectedBranch].map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Active Users by Year - Line */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Active Users by Year</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activeUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Overdue Books - Area */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Overdue Books Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={overdueTrendData}>
              <defs>
                <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="overdue" stroke="#ef4444" fill="url(#colorOverdue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Issuance */}
        <div className="col-span-1 md:col-span-2 bg-white shadow-lg p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Monthly Issuance Summary</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyIssuanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="issued" fill="#3a7ce1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
