import { useState } from "react";
import api from "../api/api";
import "./auth.css";

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/signup";
      const res = await api.post(url, { email, password });

      
      if (!isLogin) {
        alert(res.data.message);
        setIsLogin(true);
        setPassword("");
        return;
      }

      
      const { token, expiresIn } = res.data;

      if (!token || !expiresIn) {
        alert("Authentication failed");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem(
        "tokenExpiry",
        Date.now() + expiresIn * 1000
      );

      onAuth();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Authentication failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Create account"
            : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
