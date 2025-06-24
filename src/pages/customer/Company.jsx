import { useState } from "react";
import {
  FaBuilding,
  FaEdit,
  FaEye,
  FaMapMarker,
  FaPhone,
  FaTrash,
  FaUpload,
  FaUser,
} from "react-icons/fa";

const Company = () => {
  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    mobileNo: "",
    address: "",
    logo: null,
    logoPreview: "",
  });

  // Companies list state with mock data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: "Tech Innovations",
      ownerName: "John Smith",
      mobileNo: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA",
      logoPreview: "",
    },
    {
      id: 2,
      companyName: "Global Solutions",
      ownerName: "Emily Johnson",
      mobileNo: "+44 20 7123 4567",
      address: "456 Business Avenue, London, UK",
      logoPreview: "",
    },
    {
      id: 3,
      companyName: "Creative Minds",
      ownerName: "Michael Chen",
      mobileNo: "+61 2 9876 5432",
      address: "789 Innovation Road, Sydney, Australia",
      logoPreview: "",
    },
  ]);

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setError("");
    } else {
      setError("Please upload a valid image file");
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.companyName || !formData.ownerName || !formData.mobileNo) {
      setError("Company Name, Owner Name, and Mobile No are required");
      return;
    }

    if (isEditing && currentCompany) {
      // Update existing company
      setCompanies(
        companies.map((comp) =>
          comp.id === currentCompany.id ? { ...comp, ...formData } : comp
        )
      );
    } else {
      // Add new company
      const newCompany = {
        id: Date.now(),
        ...formData,
      };
      setCompanies([...companies, newCompany]);
    }

    // Reset form
    setFormData({
      companyName: "",
      ownerName: "",
      mobileNo: "",
      address: "",
      logo: null,
      logoPreview: "",
    });

    setCurrentCompany(null);
    setIsEditing(false);
    setError("");
  };

  // Handle edit
  const handleEdit = (company) => {
    setFormData({
      companyName: company.companyName,
      ownerName: company.ownerName,
      mobileNo: company.mobileNo,
      address: company.address,
      logo: null,
      logoPreview: company.logoPreview || "",
    });
    setCurrentCompany(company);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
    if (currentCompany && currentCompany.id === id) {
      setCurrentCompany(null);
      setIsEditing(false);
    }
  };

  // Reset form
  const handleCancelEdit = () => {
    setFormData({
      companyName: "",
      ownerName: "",
      mobileNo: "",
      address: "",
      logo: null,
      logoPreview: "",
    });
    setCurrentCompany(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
            <FaBuilding className="mr-3 text-indigo-600" /> Company Management
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Company" : "Add New Company"}
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition"
            >
              <FaEye className="mr-2" /> View Companies
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-gray-700 mb-2 font-medium flex items-center">
                  <FaBuilding className="mr-2 text-indigo-600" /> Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium flex items-center">
                  <FaUser className="mr-2 text-indigo-600" /> Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Owner's name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium flex items-center">
                  <FaPhone className="mr-2 text-indigo-600" /> Mobile No *
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Address Section */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium flex items-center">
                  <FaMapMarker className="mr-2 text-indigo-600" /> Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Company address"
                ></textarea>
              </div>

              {/* Logo Upload Section */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Company Logo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    {formData.logoPreview ? (
                      <img
                        src={formData.logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-center">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-gray-400 text-sm">
                          PNG, JPG (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition"
              >
                {isEditing ? "Update Company" : "Add Company"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Company List Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Registered Companies
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto flex-grow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No companies found. Add your first company using the
                        form.
                      </td>
                    </tr>
                  ) : (
                    companies.map((company) => (
                      <tr
                        key={company.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {company.logoPreview ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={company.logoPreview}
                                  alt="Logo"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {company.companyName}
                              </div>
                              <div className="text-xs text-gray-500 sm:hidden">
                                {company.mobileNo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {company.ownerName}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {company.mobileNo}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                handleEdit(company);
                                setIsModalOpen(false);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(company.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Showing {companies.length} of {companies.length} companies
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
