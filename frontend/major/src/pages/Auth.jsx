import { useState } from "react";
import api from "../api/api";
import "./auth.css";

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const url = isLogin ? "/auth/login" : "/auth/signup";
    const res = await api.post(url, form);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      onAuth();
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={submit}>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
