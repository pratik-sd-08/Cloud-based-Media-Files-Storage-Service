import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "/auth/login" : "/auth/signup";
    await api.post(url, { email, password });

    if (isLogin) {
      navigate("/");
    } else {
      alert("Signup successful. Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Already have account"}
        </p>
      </div>
    </div>
  );
}
