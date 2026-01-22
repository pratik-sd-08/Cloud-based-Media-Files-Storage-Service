import Upload from "./Upload";
import "./dashboard.css";

export default function Dashboard({ onLogout }) {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-card">
        <Upload />
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
