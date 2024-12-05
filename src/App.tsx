import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: ("admin" | "receptor" | "doador")[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["admin", "receptor", "doador"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
