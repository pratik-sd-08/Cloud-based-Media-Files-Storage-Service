import { useParams } from "react-router-dom";
import "./shared.css";

export default function Shared() {
  const { id } = useParams();

  return (
    <div className="shared-container">
      <div className="shared-card">
        <h2>Shared File</h2>

        <a
          href={`${import.meta.env.VITE_API_URL}/files/download/${id}`}
          target="_blank"
          rel="noreferrer"
          className="download-btn"
        >
          Download File
        </a>
      </div>
    </div>
  );
}
