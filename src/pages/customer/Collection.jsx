import { useEffect, useState } from "react";

const Collection = () => {
  // Mock customer data
  const customers = [
    { id: 1, name: "John Smith", phone: "+1 (555) 123-4567", status: "active" },
    {
      id: 2,
      name: "Emma Johnson",
      phone: "+1 (555) 987-6543",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Brown",
      phone: "+1 (555) 234-5678",
      status: "past-due",
    },
    {
      id: 4,
      name: "Sarah Davis",
      phone: "+1 (555) 876-5432",
      status: "active",
    },
    {
      id: 5,
      name: "David Wilson",
      phone: "+1 (555) 345-6789",
      status: "completed",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      phone: "+1 (555) 765-4321",
      status: "active",
    },
    {
      id: 7,
      name: "Robert Taylor",
      phone: "+1 (555) 456-7890",
      status: "past-due",
    },
  ];

  // Mock loan data
  const loanData = {
    1: {
      loanId: "L-1001",
      totalAmount: 5000,
      paidAmount: 2500,
      dueDate: "2023-12-15",
      installments: 12,
      paidInstallments: 6,
      interestRate: 8.5,
      status: "active",
    },
    2: {
      loanId: "L-1002",
      totalAmount: 8000,
      paidAmount: 4000,
      dueDate: "2023-11-30",
      installments: 16,
      paidInstallments: 8,
      interestRate: 7.2,
      status: "active",
    },
    3: {
      loanId: "L-1003",
      totalAmount: 12000,
      paidAmount: 9000,
      dueDate: "2024-01-20",
      installments: 24,
      paidInstallments: 18,
      interestRate: 6.8,
      status: "past-due",
    },
    4: {
      loanId: "L-1004",
      totalAmount: 3000,
      paidAmount: 1500,
      dueDate: "2023-12-05",
      installments: 6,
      paidInstallments: 3,
      interestRate: 9.0,
      status: "active",
    },
    5: {
      loanId: "L-1005",
      totalAmount: 10000,
      paidAmount: 10000,
      dueDate: "2024-02-10",
      installments: 20,
      paidInstallments: 20,
      interestRate: 7.5,
      status: "completed",
    },
    6: {
      loanId: "L-1006",
      totalAmount: 7500,
      paidAmount: 2500,
      dueDate: "2024-03-15",
      installments: 15,
      paidInstallments: 5,
      interestRate: 8.0,
      status: "active",
    },
    7: {
      loanId: "L-1007",
      totalAmount: 6000,
      paidAmount: 2000,
      dueDate: "2023-12-20",
      installments: 12,
      paidInstallments: 4,
      interestRate: 9.5,
      status: "past-due",
    },
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionAmount, setCollectionAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Filter customers based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.phone.includes(query)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery]);

  // Simulate API fetch for loan details
  useEffect(() => {
    if (selectedCustomer) {
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => {
        setIsLoading(false);
        setCollectionAmount("");
        setIsSaved(false);
      }, 800);
    }
  }, [selectedCustomer]);

  const handleSave = () => {
    if (!collectionAmount || isNaN(collectionAmount) || collectionAmount <= 0) {
      return;
    }

    // Simulate save action
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setShowSuccess(true);
      setCollectionAmount("");

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "past-due":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Loan Collection
          </h1>
          <p className="text-gray-600">
            Select a customer and record today's payment
          </p>
        </div>

        {/* Customer Search Card */}
        {!selectedCustomer && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Find Customer
            </h2>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or phone number..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Customer List */}
            <div className="max-h-80 overflow-y-auto pr-2">
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No customers found
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => setSelectedCustomer(customer.id)}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedCustomer === customer.id
                          ? "bg-blue-50 border-2 border-blue-200"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                          <span className="text-indigo-700 font-semibold">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {customer.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              customer.status
                            )}`}
                          >
                            {customer.status === "past-due"
                              ? "Past Due"
                              : customer.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm truncate">
                          {customer.phone}
                        </p>
                      </div>
                      <div>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loan Details Card */}
        {selectedCustomer && (
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-500 ${
              isLoading ? "opacity-70" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Loan Details
              </h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-gray-700 font-medium mb-3">
                        Loan Summary
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          loanData[selectedCustomer].status
                        )}`}
                      >
                        {loanData[selectedCustomer].status === "past-due"
                          ? "Past Due"
                          : loanData[selectedCustomer].status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan ID</span>
                        <span className="font-medium">
                          {loanData[selectedCustomer].loanId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-medium">
                          $
                          {loanData[
                            selectedCustomer
                          ].totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid</span>
                        <span className="font-medium text-green-600">
                          $
                          {loanData[
                            selectedCustomer
                          ].paidAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Remaining Balance</span>
                        <span className="font-medium text-red-600">
                          $
                          {(
                            loanData[selectedCustomer].totalAmount -
                            loanData[selectedCustomer].paidAmount
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <h3 className="text-gray-700 font-medium mb-3">
                      Payment Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date</span>
                        <span className="font-medium">
                          {loanData[selectedCustomer].dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Installments</span>
                        <span className="font-medium">
                          {loanData[selectedCustomer].paidInstallments} of{" "}
                          {loanData[selectedCustomer].installments} paid
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate</span>
                        <span className="font-medium">
                          {loanData[selectedCustomer].interestRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Payment</span>
                        <span className="font-medium">
                          $
                          {(
                            (loanData[selectedCustomer].totalAmount -
                              loanData[selectedCustomer].paidAmount) /
                            (loanData[selectedCustomer].installments -
                              loanData[selectedCustomer].paidInstallments)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Payment Progress
                    </span>
                    <span className="text-sm font-medium">
                      {(
                        (loanData[selectedCustomer].paidAmount /
                          loanData[selectedCustomer].totalAmount) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{
                        width: `${
                          (loanData[selectedCustomer].paidAmount /
                            loanData[selectedCustomer].totalAmount) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Collection Input */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                  <h3 className="text-gray-700 font-medium mb-4">
                    Record Payment
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Today's Collection Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={collectionAmount}
                          onChange={(e) => setCollectionAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          min="1"
                          max={
                            loanData[selectedCustomer].totalAmount -
                            loanData[selectedCustomer].paidAmount
                          }
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Max: $
                        {(
                          loanData[selectedCustomer].totalAmount -
                          loanData[selectedCustomer].paidAmount
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleSave}
                        disabled={isLoading || isSaved || !collectionAmount}
                        className={`px-6 py-3 rounded-xl font-medium transition w-full sm:w-auto ${
                          isLoading || !collectionAmount
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md"
                        }`}
                      >
                        {isLoading ? "Processing..." : "Save Collection"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center animate-fadeInUp">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>Payment recorded successfully!</span>
          </div>
        )}

        {/* Empty State */}
        {!selectedCustomer && filteredCustomers.length > 0 && (
          <div className="text-center py-12">
            <div className="mx-auto mb-6">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select a customer
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Choose a customer from the list above to view loan details and
              record a payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
