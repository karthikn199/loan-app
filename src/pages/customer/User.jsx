import { useState } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaTrash,
  FaUpload,
  FaUser,
} from "react-icons/fa";

const UserManagement = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    dob: "",
    address: "",
    image: null,
    imagePreview: "",
  });

  // Users list state with mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      mobileNo: "+1 (555) 123-4567",
      dob: "1990-05-15",
      address: "123 Main St, New York, NY",
      imagePreview: "",
    },
    {
      id: 2,
      name: "Maria Garcia",
      mobileNo: "+1 (555) 987-6543",
      dob: "1985-12-01",
      address: "456 Elm St, Los Angeles, CA",
      imagePreview: "",
    },
    {
      id: 3,
      name: "James Wilson",
      mobileNo: "+1 (555) 456-7890",
      dob: "1995-08-23",
      address: "789 Oak St, Chicago, IL",
      imagePreview: "",
    },
  ]);

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
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

    if (!formData.name || !formData.mobileNo || !formData.dob) {
      setError("Name, Mobile No, and Date of Birth are required");
      return;
    }

    if (isEditing && currentUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        ...formData,
      };
      setUsers([...users, newUser]);
    }

    // Reset form
    setFormData({
      name: "",
      mobileNo: "",
      dob: "",
      address: "",
      image: null,
      imagePreview: "",
    });

    setCurrentUser(null);
    setIsEditing(false);
    setError("");
  };

  // Handle edit
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      mobileNo: user.mobileNo,
      dob: user.dob,
      address: user.address,
      image: null,
      imagePreview: user.imagePreview || "",
    });
    setCurrentUser(user);
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(null);
      setIsEditing(false);
    }
  };

  // Reset form
  const handleCancelEdit = () => {
    setFormData({
      name: "",
      mobileNo: "",
      dob: "",
      address: "",
      image: null,
      imagePreview: "",
    });
    setCurrentUser(null);
    setIsEditing(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
            <FaUser className="mr-3 text-indigo-600" /> User Management
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Form Section */}
            <div className="md:w-1/2 p-6 md:p-8 bg-gradient-to-br from-indigo-50 to-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? "Edit User Profile" : "Create New User"}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium flex items-center">
                    <FaUser className="mr-2 text-indigo-600" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-600" /> Date of
                      Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    {formData.dob && (
                      <div className="mt-1 text-sm text-indigo-600">
                        Age: {calculateAge(formData.dob)} years
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-indigo-600" /> Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Full address"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Profile Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition">
                      {formData.imagePreview ? (
                        <img
                          src={formData.imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaUpload className="w-10 h-10 text-indigo-400 mb-3" />
                          <p className="text-indigo-700 text-center">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-indigo-400 text-sm">
                            PNG, JPG (MAX. 2MB)
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg"
                  >
                    {isEditing ? "Update Profile" : "Create User"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* User List Preview */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  User Directory
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition"
                >
                  <FaEye className="mr-2" /> View All
                </button>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                    <p className="text-gray-600">No users added yet</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Create your first user profile
                    </p>
                  </div>
                ) : (
                  users.slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition"
                    >
                      <div className="flex-shrink-0">
                        {user.imagePreview ? (
                          <img
                            className="h-14 w-14 rounded-full object-cover border-2 border-indigo-200"
                            src={user.imagePreview}
                            alt="Profile"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-14 h-14 flex items-center justify-center text-gray-500">
                            <FaUser />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.mobileNo}
                        </p>
                        <p className="text-xs text-indigo-600">
                          {user.dob &&
                            `${formatDate(user.dob)} (${calculateAge(
                              user.dob
                            )} years)`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {users.length > 3 && (
                <div className="mt-4 text-center text-indigo-600 font-medium">
                  + {users.length - 3} more users
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User List Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                User Directory
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
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      DOB & Age
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No users found. Create your first user profile.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.imagePreview ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200"
                                  src={user.imagePreview}
                                  alt="Profile"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center text-gray-500">
                                  <FaUser />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-500 md:hidden">
                                {user.mobileNo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.mobileNo}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {user.dob && (
                            <>
                              <div>{formatDate(user.dob)}</div>
                              <div className="text-indigo-600">
                                {calculateAge(user.dob)} years
                              </div>
                            </>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                handleEdit(user);
                                setIsModalOpen(false);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
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
                  Showing {users.length} of {users.length} users
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

export default UserManagement;
