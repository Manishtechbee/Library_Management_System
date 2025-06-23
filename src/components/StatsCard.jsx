import React from 'react';

export default function StatsCard({ title, value, color = '#3a7ce1' }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg text-center">
      <h4 className="text-lg font-semibold text-blue-900">{title}</h4>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}