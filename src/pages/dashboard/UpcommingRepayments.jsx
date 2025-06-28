// components/UpcomingRepayments.jsx
import { RiCalendarEventLine } from "react-icons/ri";

const UpcomingRepayments = ({ repayments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <RiCalendarEventLine /> Upcoming Repayments
      </h2>
      <div className="space-y-4">
        {repayments.map((repayment) => (
          <div
            key={repayment.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
          >
            <div>
              <h3 className="font-medium text-gray-800">{repayment.customer}</h3>
              <p className="text-sm text-gray-500">Loan ID: {repayment.id}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">{repayment.amount}</p>
              <span
                className={`text-xs ${
                  repayment.status === "due" ? "text-red-600" : "text-gray-500"
                }`}
              >
                Due {repayment.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
        View All Repayments <span>→</span>
      </button>
    </div>
  );
};

export default UpcomingRepayments;