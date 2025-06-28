// components/StatsCard.jsx
import React from "react";
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiCreditCard,
  FiActivity
} from "react-icons/fi";

const StatsCard = ({ type, value, target, change }) => {
  // Configuration for each card type
  const cardConfig = {
    collection: {
      title: "Today's Collection",
      icon: <FiDollarSign className="text-white" size={18} />,
      color: "bg-gradient-to-br from-indigo-600 to-indigo-700",
      action: "View Collections",
      link: "/collections",
    },
    expense: {
      title: "Today's Expense",
      icon: <FiCreditCard className="text-white" size={18} />,
      color: "bg-gradient-to-br from-rose-600 to-rose-700",
      action: "View Expenses",
      link: "/expenses",
    },
    newLoan: {
      title: "Today's New Loans",
      icon: <FiTrendingUp className="text-white" size={18} />,
      color: "bg-gradient-to-br from-emerald-600 to-emerald-700",
      action: "View New Loans",
      link: "/loans/new",
    },
    activeLoans: {
      title: "Active Loans",
      icon: <FiActivity className="text-white" size={18} />,
      color: "bg-gradient-to-br from-amber-600 to-amber-700",
      action: "Manage Loans",
      link: "/loans/active",
    },
  };

  const config = cardConfig[type];

  return (
    <div
      className={`${config.color} rounded-xl shadow-lg p-4 text-white transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
          {config.icon}
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full flex items-center ${
            change >= 0
              ? "bg-green-400/30 text-green-100"
              : "bg-red-400/30 text-red-100"
          }`}
        >
          {change >= 0 ? (
            <FiTrendingUp className="mr-1" size={12} />
          ) : (
            <FiTrendingDown className="mr-1" size={12} />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      
      <h3 className="text-xs font-medium opacity-90 mt-2">{config.title}</h3>
      <p className="text-xl font-bold mt-1">{`₹${value}`}</p>
      
      {type === 'collection' && target && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Target: ₹{target}</span>
            <span>{Math.round((value/target)*100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5">
            <div 
              className="bg-white h-1.5 rounded-full" 
              style={{ width: `${Math.min(100, Math.round((value/target)*100))}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <a
        href={config.link}
        className="mt-3 inline-block text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
      >
        {config.action} →
      </a>
    </div>
  );
};

export default StatsCard;