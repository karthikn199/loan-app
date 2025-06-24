import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiEdit,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const CustomerList = () => {
  // Updated data structure to support multiple loans per customer
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);

  // Toggle loan details visibility
  const toggleLoanDetails = (customerId) => {
    setExpandedCustomerId(
      expandedCustomerId === customerId ? null : customerId
    );
  };

  // Load sample data with multiple loans per customer
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        fullName: "John Smith",
        email: "john@example.com",
        phone: "555-123-4567",
        totalLoans: 2,
        totalDue: 10225.0,
        status: "Active",
        address: "New street, Bangalore.",
        loans: [
          {
            id: "loan-1-1",
            amount: 5000,
            dueDays: 30,
            interestRate: 5.5,
            totalDue: 5225.0,
            dateIssued: "2023-06-15",
            status: "Active",
          },
          {
            id: "loan-1-2",
            amount: 3500,
            dueDays: 45,
            interestRate: 6.0,
            totalDue: 3605.0,
            dateIssued: "2023-07-01",
            status: "Pending",
          },
        ],
      },
      {
        id: 2,
        fullName: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "555-987-6543",
        totalLoans: 1,
        totalDue: 8380.0,
        status: "Pending",
        address: "T-Nagar, Chennai.",
        loans: [
          {
            id: "loan-2-1",
            amount: 8000,
            dueDays: 45,
            interestRate: 6.2,
            totalDue: 8380.0,
            dateIssued: "2023-07-10",
            status: "Pending",
          },
        ],
      },
      {
        id: 3,
        fullName: "Michael Chen",
        email: "michael@example.com",
        phone: "555-456-7890",
        totalLoans: 3,
        totalDue: 27480.0,
        status: "Active",
        address: "Anna nagar, Chennai.",
        loans: [
          {
            id: "loan-3-1",
            amount: 12000,
            dueDays: 60,
            interestRate: 4.8,
            totalDue: 12480.0,
            dateIssued: "2023-05-22",
            status: "Active",
          },
          {
            id: "loan-3-2",
            amount: 5000,
            dueDays: 30,
            interestRate: 5.0,
            totalDue: 5125.0,
            dateIssued: "2023-06-30",
            status: "Closed",
          },
          {
            id: "loan-3-3",
            amount: 8000,
            dueDays: 90,
            interestRate: 4.5,
            totalDue: 9875.0,
            dateIssued: "2023-07-15",
            status: "Active",
          },
        ],
      },
      // ... other customers with multiple loans
    ];

    setCustomers(sampleData);
    setFilteredCustomers(sampleData);
  }, []);

  // Search functionality
  useEffect(() => {
    const results = customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, customers]);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredCustomers;

    return [...filteredCustomers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSortedData().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Delinquent: "bg-red-100 text-red-800",
      Closed: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Table Header with Search and Controls */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md">
            <FiPlus className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("fullName")}
              >
                <div className="flex items-center">
                  Customer
                  {sortConfig.key === "fullName" &&
                    (sortConfig.direction === "ascending" ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Loans
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("totalDue")}
              >
                <div className="flex items-center">
                  Total Due
                  {sortConfig.key === "totalDue" &&
                    (sortConfig.direction === "ascending" ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "ascending" ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((customer) => (
              <>
                {/* Customer row */}
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => toggleLoanDetails(customer.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                        <FiUser className="text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {customer.fullName}
                          <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                            {customer.totalLoans} loan
                            {customer.totalLoans > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {customer.loans.slice(0, 2).map((loan, index) => (
                        <div
                          key={index}
                          className="bg-green-100 px-3 py-1.5 rounded-md text-xs"
                        >
                          <div className="font-medium">
                            {formatCurrency(loan.amount)}
                          </div>
                          <div className="text-gray-500">
                            {loan.dueDays} days
                          </div>
                        </div>
                      ))}
                      {customer.loans.length > 2 && (
                        <div className="bg-green-200 px-3 py-1.5 rounded-md text-xs flex items-center">
                          +{customer.loans.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(customer.totalDue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle view action
                        }}
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit action
                        }}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete action
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Loan details row */}
                {expandedCustomerId === customer.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="bg-white border rounded-lg shadow-sm">
                        <div className="px-4 py-3 border-b font-medium text-gray-700">
                          {customer.fullName}'s Loans
                        </div>
                        <div className="divide-y">
                          {customer.loans.map((loan) => (
                            <div
                              key={loan.id}
                              className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4"
                            >
                              <div className="md:col-span-1">
                                <div className="text-sm text-gray-500">
                                  Loan ID
                                </div>
                                <div className="font-medium">{loan.id}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Amount
                                </div>
                                <div className="font-medium">
                                  {formatCurrency(loan.amount)}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Due Days
                                </div>
                                <div className="font-medium">
                                  {loan.dueDays} days
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Interest
                                </div>
                                <div className="font-medium">
                                  {loan.interestRate}%
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Total Due
                                </div>
                                <div className="font-bold">
                                  {formatCurrency(loan.totalDue)}
                                </div>
                              </div>
                              
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Status
                                  </div>
                                  {getStatusBadge(loan.status)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Issued: {loan.dateIssued}
                                </div>
                                <div className="flex space-x-2">
                                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                    View Details
                                  </button>
                                </div>
                              </div>
                           
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No customers found</div>
            <div className="text-gray-500 text-sm">
              Try adjusting your search or add a new customer
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastItem, filteredCustomers.length)}
          </span>{" "}
          of <span className="font-medium">{filteredCustomers.length}</span>{" "}
          customers
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <FiChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
