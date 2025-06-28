// components/RiskAssessment.jsx
import React from "react";

const RiskAssessment = () => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Portfolio Risk Level</h2>
      <div className="flex items-center justify-center my-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffffff30"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="100"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">Medium</span>
            <span className="text-sm opacity-80">Risk Level</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm opacity-90">
          Current NPA ratio: 3.2% (Industry avg: 4.5%)
        </p>
        <button className="mt-4 text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
          Risk Analysis
        </button>
      </div>
    </div>
  );
};

export default RiskAssessment;