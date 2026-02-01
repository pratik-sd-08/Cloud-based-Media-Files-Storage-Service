import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./api/api";


import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const checkSession = async () => {
    try {
      await api.get("/files"); 
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

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
