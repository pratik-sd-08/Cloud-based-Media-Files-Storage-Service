import { useEffect, useState } from "react";
import api from "../api/api";
import "./files.css";

export default function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.get("/files").then(res => setFiles(res.data));
  }, []);

  const share = async (id) => {
    const res = await api.get(`/files/share/${id}`);
    alert(res.data.link);
  };

  return (
    <div className="files-container">
      <h2>All Files</h2>

      <div className="files-list">
        {files.map((f) => (
          <div key={f._id} className="file-card">
            <span className="file-name">{f.filename}</span>

            <div className="file-actions">
              <a
                href={`http://localhost:3200/files/download/${f._id}`}
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>

              <button onClick={() => share(f._id)}>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
