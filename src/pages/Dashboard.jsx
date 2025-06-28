// pages/Dashboard.jsx
import {
  FiAlertTriangle,
  FiClock,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import DashboardActions from "./dashboard/DashboardActions";
import DashboardLayout from "./dashboard/DashboardLayout";
import PerformanceMetrics from "./dashboard/PerformanceMatrics";
import QuickActions from "./dashboard/QuickAction";
import RecentApplications from "./dashboard/RecentApplications";
import RiskAssessment from "./dashboard/RiskAssessment";
import StatsCard from "./dashboard/StatsCard";
import UpcomingRepayments from "./dashboard/UpcommingRepayments";
import RecentCollections from "./dashboard/RecentApplications";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  // Key metrics
const collections = [
  {
    id: "COL-1001",
    loanId: "LN-2045",
    customer: "Rahul Sharma",
    amount: "₹12,450",
    type: "Personal Loan",
    date: "Today, 10:30 AM"
  },
  {
    id: "COL-1002",
    loanId: "LN-1987",
    customer: "Priya Patel",
    amount: "₹8,720",
    type: "Home Loan",
    date: "Today, 09:15 AM"
  },
  {
    id: "COL-1003",
    loanId: "LN-2102",
    customer: "Vikram Singh",
    amount: "₹15,300",
    type: "Business Loan",
    date: "Yesterday, 4:45 PM"
  },
  {
    id: "COL-1004",
    loanId: "LN-2056",
    customer: "Ananya Gupta",
    amount: "₹9,850",
    type: "Education Loan",
    date: "Yesterday, 2:30 PM"
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
    {
      id: "LA-1005",
      customer: "Sanjay Verma",
      amount: "₹350,000",
      type: "Vehicle Loan",
      status: "pending",
      date: "3 hours ago",
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
    {
      id: "LN-2056",
      customer: "Neha Desai",
      dueDate: "Dec 16",
      amount: "₹9,850",
      status: "pending",
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    { name: "Approval Rate", value: "78%", trend: "up" },
    { name: "Avg Processing Time", value: "2.4 days", trend: "down" },
    { name: "Default Rate", value: "2.1%", trend: "down" },
    { name: "Customer Satisfaction", value: "4.7/5", trend: "up" },
    { name: "Loan Disbursal Growth", value: "22%", trend: "up" },
    { name: "Collection Efficiency", value: "94.5%", trend: "up" },
  ];

  const handleRefresh = () => {
    // Refresh logic here
    console.log("Refreshing dashboard data...");
    // In a real app, you would dispatch an action to fetch fresh data
  };

  // const primaryAction = (
  //   <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 gap-2">
  //     New Loan Application
  //   </button>
  // );

  return (
    <DashboardLayout
      title="Loan Management Dashboard"
      description={`Welcome back, ${
        user?.name || "Admin"
      }! Here's your lending performance overview.`}
      user={user}
    >
      <DashboardActions
      // onRefresh={handleRefresh}
      // primaryAction={primaryAction}
      />
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          type="collection"
          value="1,85,000"
          target="2,00,000"
          change={7.5}
        />
        <StatsCard type="expense" value="32,500" change={-2.3} />
        <StatsCard type="newLoan" value="5,75,000" change={12.4} />
        <StatsCard type="activeLoans" value="1,248" change={5.2} />
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RecentCollections collections={collections} />
        <QuickActions />
      </div>
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingRepayments repayments={upcomingRepayments} />
        <PerformanceMetrics metrics={performanceMetrics} />
        <RiskAssessment />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
