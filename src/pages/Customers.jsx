import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter, FiDownload, FiPrinter } from 'react-icons/fi';
import { MdOutlineAccountCircle, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AddCustomer from './customer/AddCustomer';

const CustomersPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  // Mock data - replace with API calls in real implementation
  useEffect(() => {
    const mockCustomers = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        phone: '9876543210',
        email: 'rajesh@example.com',
        address: '123 MG Road, Bangalore',
        activeLoans: 2,
        totalBalance: 25000,
        lastPayment: '2023-05-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Priya Sharma',
        phone: '8765432109',
        email: 'priya@example.com',
        address: '456 Koramangala, Bangalore',
        activeLoans: 1,
        totalBalance: 15000,
        lastPayment: '2023-05-10',
        status: 'active'
      },
      {
        id: 3,
        name: 'Amit Patel',
        phone: '7654321098',
        email: 'amit@example.com',
        address: '789 Indiranagar, Bangalore',
        activeLoans: 0,
        totalBalance: 0,
        lastPayment: '2023-04-20',
        status: 'inactive'
      },
      // Add more mock customers as needed
    ];
    
    setTimeout(() => {
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleDelete = (id) => {
    // In a real app, you would call an API here
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleNewCustomer = () => {
    navigate('/customers/new');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mt-4">
       <AddCustomer />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FiFilter className="text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <FiDownload className="text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <FiPrinter className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loans</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <MdOutlineAccountCircle className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                              <div className="text-sm text-gray-500">{customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MdPhone className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-900">{customer.phone}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MdLocationOn className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500 truncate max-w-xs">{customer.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.activeLoans > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.activeLoans} active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{customer.totalBalance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.lastPayment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(customer.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <FiEdit2 className="inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="inline mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No customers found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredCustomers.length > customersPerPage && (
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCustomer, filteredCustomers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCustomers.length}</span> customers
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomersPage;