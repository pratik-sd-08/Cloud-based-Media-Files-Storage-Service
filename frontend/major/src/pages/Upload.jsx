import { useState } from "react";
import api from "../api/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    if (!file) {
      setMsg("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
        err.message ||
        "Upload failed"
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload File</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>Upload</button>

      <p>{msg}</p>
    </div>
  );
}
