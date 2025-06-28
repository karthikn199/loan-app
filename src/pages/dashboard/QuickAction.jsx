// components/QuickActions.jsx
import { BsPieChart } from "react-icons/bs";
import { FiUsers, FiDollarSign, FiFileText } from "react-icons/fi";

const QuickActions = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BsPieChart /> Quick Actions
      </h2>
      <div className="space-y-4">
        <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
          <FiUsers className="text-xl" />
          <div>
            <h3 className="font-medium">New Customer</h3>
            <p className="text-sm opacity-80 mt-1">Register new borrower</p>
          </div>
        </button>
        <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
          <FiDollarSign className="text-xl" />
          <div>
            <h3 className="font-medium">Disburse Loan</h3>
            <p className="text-sm opacity-80 mt-1">Process approved loan</p>
          </div>
        </button>
        <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
          <FiFileText className="text-xl" />
          <div>
            <h3 className="font-medium">Generate Report</h3>
            <p className="text-sm opacity-80 mt-1">Portfolio performance</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;