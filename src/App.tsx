import React from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Enum para Papéis
export enum Roles {
  ADMIN = "admin",
  RECEPTOR = "receptor",
  DOADOR = "doador",
}

// Rota Privada
interface PrivateRouteProps {
  children: React.ReactNode;
  roles: Roles[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Carregando...
      </div>
    );
  }

  return user && roles.includes(user.role as Roles) ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth/login" />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página de Login */}
          <Route path="/auth/login" element={<Login />} />

          {/* Página de Registro */}
          <Route path="/auth/register" element={<Register />} />

          {/* Dashboard Privado Protegido */}
          <Route
            path="/auth/dashboard"
            element={
              <PrivateRoute roles={[Roles.ADMIN, Roles.RECEPTOR, Roles.DOADOR]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirecionamento para Login caso a rota não seja encontrada */}
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
