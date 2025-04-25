
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Inventario from "@/pages/Inventario";
import Proveedores from "@/pages/Proveedores";
import Tendidos from "@/pages/Tendidos";
import Cortes from "@/pages/Cortes";
import Prendas from "@/pages/Prendas";
import Usuarios from "@/pages/Usuarios";
import Login from "@/pages/Login";
import Layout from "@/components/Layout";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.Permisos) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Layout>
                <Inventario />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <Proveedores />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tendidos"
          element={
            <ProtectedRoute>
              <Layout>
                <Tendidos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cortes"
          element={
            <ProtectedRoute>
              <Layout>
                <Cortes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prendas"
          element={
            <ProtectedRoute>
              <Layout>
                <Prendas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Layout>
                <Usuarios />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
