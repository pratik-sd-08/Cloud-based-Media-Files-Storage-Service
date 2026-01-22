import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry || Date.now() > expiry) {
      
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setAuthenticated(false);
  };

  return authenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Auth onAuth={() => setAuthenticated(true)} />
  );
}
