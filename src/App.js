import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Navbar from "./pages/NavBar";
import CustomersPage from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Collection from "./pages/customer/Collection";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Navbar />
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
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard/>
          </ProtectedRoute>
        }
      />

      
    </Routes>
  );
};

export default App;
