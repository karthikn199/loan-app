// components/PerformanceMetrics.jsx
import { AiOutlineAudit } from "react-icons/ai";

const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <AiOutlineAudit /> Key Performance Metrics
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            <div className="flex items-center mt-2">
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              <span
                className={`ml-2 text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? "↑" : "↓"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;