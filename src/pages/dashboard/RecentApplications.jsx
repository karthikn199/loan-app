// components/RecentCollections.jsx
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiChevronRight, FiDollarSign, FiSearch } from "react-icons/fi";

const RecentCollections = ({ collections }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      {/* Header with improved styling */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
            <FiDollarSign className="text-lg" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Collections
            </h2>
            <p className="text-sm text-gray-500">
              Last {collections.length} transactions
            </p>
          </div>
        </div>

        {/* Search with modern styling */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mobile cards view */}
      <div className="sm:hidden space-y-3">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  {collection.customer}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Loan ID: {collection.loanId}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <BsThreeDotsVertical />
              </button>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {collection.amount}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {collection.date}
              </span>
            </div>

            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>{collection.type}</span>
              <button className="flex items-center text-indigo-600">
                Details <FiChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collected
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collections.map((collection) => (
              <tr
                key={collection.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {collection.loanId}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {collection.customer}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {collection.amount}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                  {collection.type}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
                    {collection.date}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end w-full">
                    View <FiChevronRight className="ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with modern button */}
      <div className="mt-6 flex justify-center sm:justify-end">
        <button className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">
          View All Collections
          <FiChevronRight className="ml-1.5" />
        </button>
      </div>
    </div>
  );
};

export default RecentCollections;
