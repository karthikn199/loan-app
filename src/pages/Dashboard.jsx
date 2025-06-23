import { AiOutlineAudit } from "react-icons/ai";
import { BsGraphUpArrow, BsPieChart } from "react-icons/bs";
import {
  FiAlertTriangle,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiRefreshCw,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { RiCalendarEventLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  // Key metrics
  const stats = [
    {
      title: "Total Loans Disbursed",
      value: "₹42.8M",
      change: "+18%",
      icon: <FiDollarSign className="text-white" />,
      trend: "up",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      action: "View All",
      link: "/loans",
    },
    {
      title: "Active Loans",
      value: "1,248",
      change: "+5%",
      icon: <FiFileText className="text-white" />,
      trend: "up",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      action: "Manage",
      link: "/loans/active",
    },
    {
      title: "Pending Approvals",
      value: "87",
      change: "-12%",
      icon: <FiClock className="text-white" />,
      trend: "down",
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      action: "Review Now",
      link: "/approvals",
    },
    {
      title: "Delinquent Loans",
      value: "32",
      change: "+3%",
      icon: <FiAlertTriangle className="text-white" />,
      trend: "up",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      action: "Take Action",
      link: "/collections",
    },
  ];

  // Recent loan applications
  const recentApplications = [
    {
      id: "LA-1001",
      customer: "Rahul Sharma",
      amount: "₹250,000",
      type: "Personal Loan",
      status: "approved",
      date: "10 mins ago",
    },
    {
      id: "LA-1002",
      customer: "Priya Patel",
      amount: "₹1,500,000",
      type: "Home Loan",
      status: "pending",
      date: "25 mins ago",
    },
    {
      id: "LA-1003",
      customer: "Vikram Singh",
      amount: "₹750,000",
      type: "Business Loan",
      status: "rejected",
      date: "1 hour ago",
    },
    {
      id: "LA-1004",
      customer: "Ananya Gupta",
      amount: "₹500,000",
      type: "Education Loan",
      status: "approved",
      date: "2 hours ago",
    },
  ];

  // Upcoming repayments
  const upcomingRepayments = [
    {
      id: "LN-2045",
      customer: "Sanjay Verma",
      dueDate: "Today",
      amount: "₹12,450",
      status: "due",
    },
    {
      id: "LN-1987",
      customer: "Meena Kapoor",
      dueDate: "Tomorrow",
      amount: "₹8,720",
      status: "pending",
    },
    {
      id: "LN-2102",
      customer: "Arjun Reddy",
      dueDate: "Dec 15",
      amount: "₹15,300",
      status: "pending",
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    { name: "Approval Rate", value: "78%", trend: "up" },
    { name: "Avg Processing Time", value: "2.4 days", trend: "down" },
    { name: "Default Rate", value: "2.1%", trend: "down" },
    { name: "Customer Satisfaction", value: "4.7/5", trend: "up" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Loan Management Dashboard
            </h1>
            <p className="text-gray-500">
              Welcome back, {user?.name}! Here's your lending performance
              overview.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 gap-2">
              <FiRefreshCw /> Refresh
            </button>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 gap-2">
              New Loan Application
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 mb-4">
                  {stat.icon}
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-400/30 text-green-100"
                      : "bg-red-400/30 text-red-100"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium opacity-90">{stat.title}</h3>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              <a
                href={stat.link}
                className="mt-4 inline-block text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                {stat.action} →
              </a>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BsGraphUpArrow /> Recent Loan Applications
              </h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {app.customer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {app.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {app.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            app.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : app.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              View All Applications <span>→</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BsPieChart /> Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
                <FiUsers className="text-xl" />
                <div>
                  <h3 className="font-medium">New Customer</h3>
                  <p className="text-sm opacity-80 mt-1">
                    Register new borrower
                  </p>
                </div>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
                <FiDollarSign className="text-xl" />
                <div>
                  <h3 className="font-medium">Disburse Loan</h3>
                  <p className="text-sm opacity-80 mt-1">
                    Process approved loan
                  </p>
                </div>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors text-left flex items-center gap-3">
                <FiFileText className="text-xl" />
                <div>
                  <h3 className="font-medium">Generate Report</h3>
                  <p className="text-sm opacity-80 mt-1">
                    Portfolio performance
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Repayments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <RiCalendarEventLine /> Upcoming Repayments
            </h2>
            <div className="space-y-4">
              {upcomingRepayments.map((repayment) => (
                <div
                  key={repayment.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {repayment.customer}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Loan ID: {repayment.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {repayment.amount}
                    </p>
                    <span
                      className={`text-xs ${
                        repayment.status === "due"
                          ? "text-red-600"
                          : "text-gray-500"
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

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <AiOutlineAudit /> Key Performance Metrics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">
                    {metric.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <p className="text-xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <span
                      className={`ml-2 text-sm ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.trend === "up" ? "↑" : "↓"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
