import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./api/api";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      await api.get("/auth/session");
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth onAuth={checkSession} />} />
      <Route
        path="/*"
        element={
          authenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
    </Routes>
  );
}
