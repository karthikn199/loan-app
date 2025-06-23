import { useFormik } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff, HiLockClosed, HiMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { setUser } from "../redux/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true" || false
  );

  const savedEmail = localStorage.getItem("savedEmail") || "";
  const savedPassword = localStorage.getItem("savedPassword") || "";

  const formik = useFormik({
    initialValues: {
      email: savedEmail,
      password: savedPassword,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(4, "Too Short!").required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser = {
          email: "test@gmail.com",
          password: "Password@123",
          name: "Test User",
        };

        if (
          values.email === mockUser.email &&
          values.password === mockUser.password
        ) {
          if (rememberMe) {
            localStorage.setItem("savedEmail", values.email);
            localStorage.setItem("savedPassword", values.password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("rememberMe");
          }

          dispatch(
            setUser({
              name: mockUser.name,
              email: mockUser.email,
              token: "mock-jwt-token",
            })
          );

          localStorage.setItem("authToken", "mock-jwt-token");
          toast.success("Login successful!");
          navigate("/home");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <HiLockClosed className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">LoanCollect Pro</h1>
            <p className="text-gray-500 mt-2">Secure access to your dashboard</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`pl-10 w-full p-3 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`pl-10 w-full p-3 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500 transition" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-500 transition" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            © 2023 LoanCollect Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;