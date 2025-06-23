import { useFormik } from "formik";
import { useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMail,
  FiMapPin,
  FiPercent,
  FiPhone,
  FiPlus,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import * as Yup from "yup";

const AddCustomer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewCustomer = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  const calculateTotalDue = (amount, interestRate) => {
    if (!amount || !interestRate) return 0;
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100; // Convert 10% -> 0.10
    const interest = principal * rate;
    return (principal + interest).toFixed(2); // Total = Principal + Interest
  };

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      occupation: "",
      address: "",
      loans: [
        {
          amount: "",
          dueDays: "",
          interestRate: "",
          totalDue: "0.00",
        },
      ],
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Full name is required")
        .min(3, "Must be at least 3 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
      dob: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date cannot be in the future"),
      occupation: Yup.string().required("Occupation is required"),
      address: Yup.string().required("Address is required"),
      loans: Yup.array().of(
        Yup.object().shape({
          amount: Yup.number()
            .required("Loan amount is required")
            .positive("Must be positive"),
          dueDays: Yup.number()
            .required("Due days is required")
            .positive("Must be positive")
            .integer("Must be whole number"),
          interestRate: Yup.number()
            .required("Interest rate is required")
            .min(0.1, "Must be at least 0.1%")
            .max(100, "Cannot exceed 100%"),
        })
      ),
    }),
    onSubmit: (values) => {
      // Calculate final totals before submission
      const updatedLoans = values.loans.map((loan) => ({
        ...loan,
        totalDue: calculateTotalDue(
          loan.amount,
          loan.interestRate,
          loan.dueDays
        ),
      }));

      const finalValues = {
        ...values,
        loans: updatedLoans,
      };

      console.log("New customer:", finalValues);
      formik.resetForm();
      closeModal();
    },
  });

  // Add a new loan entry
  const addLoan = () => {
    formik.setFieldValue("loans", [
      ...formik.values.loans,
      {
        amount: "",
        dueDays: "",
        interestRate: "",
        totalDue: "0.00",
      },
    ]);
  };

  // Remove a loan entry
  const removeLoan = (index) => {
    if (formik.values.loans.length === 1) return;
    const loans = [...formik.values.loans];
    loans.splice(index, 1);
    formik.setFieldValue("loans", loans);
  };

  // Update loan field and calculate total due
  const handleLoanChange = (index, field, value) => {
    const loans = [...formik.values.loans];
    loans[index] = {
      ...loans[index],
      [field]: value,
    };

    // Calculate total due if relevant fields change
    if (["amount", "dueDays", "interestRate"].includes(field)) {
      const { amount, dueDays, interestRate } = loans[index];
      loans[index].totalDue = calculateTotalDue(amount, interestRate, dueDays);
    }

    formik.setFieldValue("loans", loans);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          Customer Management
        </h1>
        <button
          onClick={handleNewCustomer}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
        >
          <FiPlus className="mr-2" /> Add New Customer
        </button>
      </div>

      {/* Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4 md:p-5 sticky top-0 bg-white z-10">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Add New Customer
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
              {/* Section 1: Basic Details */}
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Basic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-green-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.fullName && formik.errors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                      />
                    </div>
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-blue-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="1234567890"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.phone && formik.errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-yellow-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-red-400" />
                      </div>
                      <input
                        type="date"
                        name="dob"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.dob && formik.errors.dob
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob}
                      />
                    </div>
                    {formik.touched.dob && formik.errors.dob && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.dob}
                      </p>
                    )}
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-purple-400" />
                      </div>
                      <input
                        type="text"
                        name="occupation"
                        placeholder="Software Engineer"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.occupation && formik.errors.occupation
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.occupation}
                      />
                    </div>
                    {formik.touched.occupation && formik.errors.occupation && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.occupation}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <FiMapPin className="text-pink-400" />
                      </div>
                      <textarea
                        name="address"
                        placeholder="123 Main St, City, Country"
                        rows="1"
                        className={`pl-10 pr-3 w-full py-3 border ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      ></textarea>
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Loan Details */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                  <h3 className="text-md font-semibold text-gray-800">
                    Loan Details
                  </h3>
                  <button
                    type="button"
                    onClick={addLoan}
                    className="flex items-center text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-md"
                  >
                    <FiPlus className="mr-1" /> Add Loan
                  </button>
                </div>

                {formik.values.loans.map((loan, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-200 rounded-lg relative"
                  >
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLoan(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Loan Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount ($) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="text-green-400" />
                          </div>
                          <input
                            type="number"
                            placeholder="5000"
                            className={`pl-10 pr-3 w-full py-3 border ${
                              formik.touched.loans?.[index]?.amount &&
                              formik.errors.loans?.[index]?.amount
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            value={loan.amount}
                            onChange={(e) =>
                              handleLoanChange(index, "amount", e.target.value)
                            }
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.loans?.[index]?.amount &&
                          formik.errors.loans?.[index]?.amount && (
                            <p className="mt-1 text-sm text-red-600">
                              {formik.errors.loans[index].amount}
                            </p>
                          )}
                      </div>

                      {/* Due Days */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Due Days <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiClock className="text-green-400" />
                          </div>
                          <input
                            type="number"
                            placeholder="30"
                            className={`pl-10 pr-3 w-full py-3 border ${
                              formik.touched.loans?.[index]?.dueDays &&
                              formik.errors.loans?.[index]?.dueDays
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            value={loan.dueDays}
                            onChange={(e) =>
                              handleLoanChange(index, "dueDays", e.target.value)
                            }
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.loans?.[index]?.dueDays &&
                          formik.errors.loans?.[index]?.dueDays && (
                            <p className="mt-1 text-sm text-red-600">
                              {formik.errors.loans[index].dueDays}
                            </p>
                          )}
                      </div>

                      {/* Interest Rate */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Interest (%) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPercent className="text-green-400" />
                          </div>
                          <input
                            type="number"
                            step="0.1"
                            placeholder="5.5"
                            className={`pl-10 pr-3 w-full py-3 border ${
                              formik.touched.loans?.[index]?.interestRate &&
                              formik.errors.loans?.[index]?.interestRate
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            value={loan.interestRate}
                            onChange={(e) =>
                              handleLoanChange(
                                index,
                                "interestRate",
                                e.target.value
                              )
                            }
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.loans?.[index]?.interestRate &&
                          formik.errors.loans?.[index]?.interestRate && (
                            <p className="mt-1 text-sm text-red-600">
                              {formik.errors.loans[index].interestRate}
                            </p>
                          )}
                      </div>

                      {/* Total Due (Auto-calculated) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Due
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="text-green-400" />
                          </div>
                          <input
                            type="text"
                            className="pl-10 pr-3 w-full py-3 border border-gray-300 rounded-lg bg-gray-50"
                            value={loan.totalDue}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 border-t pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 shadow-md font-medium text-sm md:text-base"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
