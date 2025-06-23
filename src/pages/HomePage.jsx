import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationOptions, setRegistrationOptions] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');

  // Mock database of student records
  const mockStudentDatabase = {
    '2023CSE001': {
      name: 'Aarav Sharma',
      mobileNo: '9876543210',
      email: 'aarav.sharma@college.edu',
      class: 'B.Tech CSE 3rd Year',
      paymentAmount: '12500'
    },
    '2023CSE002': {
      name: 'Priya Patel',
      mobileNo: '8765432109',
      email: 'priya.patel@college.edu',
      class: 'B.Tech CSE 3rd Year',
      paymentAmount: '11800'
    },
    '2023CSE003': {
      name: 'Rahul Verma',
      mobileNo: '7654321098',
      email: 'rahul.verma@college.edu',
      class: 'B.Tech CSE 3rd Year',
      paymentAmount: '13200'
    },
    '2023ECE001': {
      name: 'Neha Gupta',
      mobileNo: '6543210987',
      email: 'neha.gupta@college.edu',
      class: 'B.Tech ECE 2nd Year',
      paymentAmount: '11000'
    },
    '2023ECE002': {
      name: 'Vikram Singh',
      mobileNo: '9432109876',
      email: 'vikram.singh@college.edu',
      class: 'B.Tech ECE 2nd Year',
      paymentAmount: '10500'
    },
    '2023ME001': {
      name: 'Ananya Reddy',
      mobileNo: '8321098765',
      email: 'ananya.reddy@college.edu',
      class: 'B.Tech ME 1st Year',
      paymentAmount: '15000'
    }
  };

  useEffect(() => {
    // Get all registration numbers from our mock database
    setRegistrationOptions(Object.keys(mockStudentDatabase));
  }, []);

  const fetchStudentDetails = (regNo) => {
    setLoading(true);
    setError('');
    setStudentData(null);
    
    // Simulate API delay
    setTimeout(() => {
      if (mockStudentDatabase[regNo]) {
        setStudentData(mockStudentDatabase[regNo]);
      } else {
        setError('Student not found in records');
      }
      setLoading(false);
    }, 800); // 0.8 second delay to simulate network request
  };

  const handleRegistrationChange = (e) => {
    const regNo = e.target.value;
    setRegistrationNo(regNo);
    if (regNo) {
      fetchStudentDetails(regNo);
    }
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      if (isSuccess) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
      }
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate payment processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">College Fee Payment Portal</h1>
          <p className="text-indigo-100">Secure and easy way to pay your college fees</p>
        </div>
        
        {/* Form */}
        <div className="p-6">
          {/* Registration Dropdown */}
          <div className="mb-6">
            <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700 mb-1">
              Registration Number
            </label>
            <select
              id="registrationNo"
              value={registrationNo}
              onChange={handleRegistrationChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="">Select Registration Number</option>
              {registrationOptions.map((regNo) => (
                <option key={regNo} value={regNo}>
                  {regNo}
                </option>
              ))}
            </select>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Student Details */}
          {studentData && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Student Details
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{studentData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile No:</span>
                  <span className="font-medium">{studentData.mobileNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{studentData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium">{studentData.class}</span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-gray-200">
                  <span className="text-gray-600 font-semibold">Payment Amount:</span>
                  <span className="text-indigo-600 font-bold text-lg">₹{studentData.paymentAmount}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={loading || paymentStatus === 'success'}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition-all ${
                  loading || paymentStatus === 'success'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : paymentStatus === 'success' ? (
                  'Payment Successful'
                ) : (
                  'Make Payment'
                )}
              </button>

              {/* Payment Success Message */}
              {paymentStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                  Payment successful! A receipt has been sent to {studentData.email}.
                </div>
              )}

              {/* Payment Error Message */}
              {paymentStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  Payment failed. Please try again or contact support.
                </div>
              )}
            </div>
          )}

          {/* Payment Security */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">Accepted Cards:</span>
                <div className="flex space-x-2">
                  <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.438 12.718h1.717l1.117-5.708H10.6l-.7 3.587-.462-3.587H7.9l1.127 5.708h1.411zm4.689-5.708h-1.249l-1.325 5.708h1.249l.308-1.279h1.462l.171 1.279h1.1l-1.086-5.708zm-.171 3.587l.4-1.733.42 1.733h-.82zm3.567-3.587h-1.8l-1.086 5.708h1.249l.171-.991h1.1l.171.991h1.249l-1.086-5.708zm-.343 3.412h-.7l.343-1.733.357 1.733zM4.2 6.5h15.6c.662 0 1.2.538 1.2 1.2v8.6c0 .662-.538 1.2-1.2 1.2H4.2c-.662 0-1.2-.538-1.2-1.2V7.7c0-.662.538-1.2 1.2-1.2zm0 1.2v8.6h15.6V7.7H4.2z" />
                  </svg>
                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.5 12.718h1.528l1.117-5.708H12.6l-.7 3.587-.462-3.587H9.9l1.127 5.708h1.473zm4.689-5.708h-1.249l-1.325 5.708h1.249l.308-1.279h1.462l.171 1.279h1.1l-1.086-5.708zm-.171 3.587l.4-1.733.42 1.733h-.82zm3.567-3.587h-1.8l-1.086 5.708h1.249l.171-.991h1.1l.171.991h1.249l-1.086-5.708zm-.343 3.412h-.7l.343-1.733.357 1.733z" />
                  </svg>
                  <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.654a5.654 5.654 0 110 11.308 5.654 5.654 0 010-11.308zm0 1.5a4.154 4.154 0 100 8.308 4.154 4.154 0 000-8.308z" />
                  </svg>
                  <svg className="h-6 w-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.654a5.654 5.654 0 110 11.308 5.654 5.654 0 010-11.308zm0 1.5a4.154 4.154 0 100 8.308 4.154 4.154 0 000-8.308z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;