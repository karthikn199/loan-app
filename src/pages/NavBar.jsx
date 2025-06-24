import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiDollarSign,
  FiHome,
  FiList,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import { MdGroups, MdPayment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FiHome className="mr-2" size={18} />,
    },
    {
      name: "Customers",
      href: "/customers",
      icon: <MdGroups className="mr-2" size={18} />,
    },
    {
      name: "Loans",
      href: "/loans",
      icon: <FiDollarSign className="mr-2" size={18} />,
    },
    {
      name: "Collections",
      href: "/collection",
      icon: <MdPayment className="mr-2" size={18} />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <FiList className="mr-2" size={18} />,
    },
    {
      name: "Admin",
      href: "/admin",
      icon: <FiCalendar className="mr-2" size={18} />,
      children: [
        {
          name: "Create Company",
          href: "/company",
          icon: <FiPlus className="mr-2" size={14} />,
        },
        {
          name: "Create User",
          href: "/user",
          icon: <FiPlus className="mr-2" size={14} />,
        },
      ],
    },
  ];

  // Check if admin or any child is active
  const isAdminActive = () => {
    const adminItem = navItems.find((item) => item.name === "Admin");
    if (!adminItem || !adminItem.children) return false;
    
    return (
      location.pathname === adminItem.href ||
      adminItem.children.some((child) => location.pathname === child.href)
    );
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-indigo-700 shadow-lg py-1" : "bg-indigo-700 py-1"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center mr-2">
                  <FiDollarSign className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-xl font-bold text-white">
                  LoanCollect
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setAdminDropdownOpen(true)}
                      onMouseLeave={() => setAdminDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center ${
                          isAdminActive()
                            ? "text-white bg-indigo-800"
                            : "text-indigo-100 hover:bg-indigo-600"
                        } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                      >
                        {item.icon}
                        {item.name}
                      </button>
                      
                      {/* Admin Dropdown */}
                      {adminDropdownOpen && (
                        <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setAdminDropdownOpen(false)}
                            >
                              {child.icon}
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center ${
                        location.pathname === item.href
                          ? "text-white bg-indigo-800"
                          : "text-indigo-100 hover:bg-indigo-600"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                }
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center text-indigo-100 hover:text-white space-x-2 px-3 py-2 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Agent</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser className="inline mr-2" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiSettings className="inline mr-2" /> Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="inline mr-2" /> Logout
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white focus:outline-none"
              >
                {isOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-indigo-800 shadow-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                        className={`flex items-center w-full px-3 py-3 rounded-md text-base font-medium ${
                          isAdminActive()
                            ? "text-white bg-indigo-700"
                            : "text-indigo-200 hover:bg-indigo-700"
                        }`}
                      >
                        {item.icon}
                        <span className="mr-2">{item.name}</span>
                      </button>
                      
                      {adminDropdownOpen && (
                        <div className="pl-6">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              onClick={() => {
                                setIsOpen(false);
                                setAdminDropdownOpen(false);
                              }}
                              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                location.pathname === child.href
                                  ? "text-white bg-indigo-700"
                                  : "text-indigo-200 hover:bg-indigo-700"
                              }`}
                            >
                              {child.icon}
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                        location.pathname === item.href
                          ? "text-white bg-indigo-700"
                          : "text-indigo-200 hover:bg-indigo-700"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                }
              })}
              <div className="pt-4 pb-4 px-3 border-t border-indigo-700">
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser className="mr-2" size={18} /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FiSettings className="mr-2" size={18} /> Settings
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLogOut className="mr-2" size={18} /> Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;