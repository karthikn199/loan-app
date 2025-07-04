import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Navbar from "./pages/NavBar";
import CustomersPage from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Collection from "./pages/customer/Collection";
import Company from "./pages/customer/Company";
import UserManagement from "./pages/customer/User";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
              <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Navbar />
            <CustomersPage />
          </ProtectedRoute>
        }
      />
        <Route
        path="/collection"
        element={
          <ProtectedRoute>
            <Navbar />
            <Collection />
          </ProtectedRoute>
        }
      />
        <Route
        path="/company"
        element={
          <ProtectedRoute>
            <Navbar />
            <Company />
          </ProtectedRoute>
        }
      />
       <Route
        path="/user"
        element={
          <ProtectedRoute>
            <Navbar />
            <UserManagement />
          </ProtectedRoute>
        }
      />
      

      
    </Routes>
  );
};

export default App;
