import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Upload from "./Upload";
import Files from "./Files";
import Shared from "./Shared";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<h2>Welcome</h2>} />
          <Route path="upload" element={<Upload />} />
          <Route path="files" element={<Files />} />
          <Route path="shared/:id" element={<Shared />} />
        </Routes>
      </div>
    </div>
  );
}
